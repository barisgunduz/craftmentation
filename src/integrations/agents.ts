import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { Failure } from '../shared/errors.js';
import { bundledText, strictJSON } from '../shared/library.js';
import { clientDirectories, resolveClient } from './launcher.js';

export type Agent = 'codex' | 'claude';
export type Runner = (
  command: string,
  args: string[],
  input: string,
  cwd: string,
  signal?: AbortSignal,
  timeout?: number,
) => Promise<string>;

// No target-supplied executable, shell interpolation, or arbitrary argument configuration.
export const runProcess: Runner = async (command, args, input, cwd, signal, timeout = 180000) => {
  if (signal?.aborted) throw new Failure('E_PROVIDER', 6, 'Agent request cancelled.');
  const pathKey = Object.keys(process.env).find((key) => key.toUpperCase() === 'PATH');
  const directories = clientDirectories(process.env[pathKey ?? 'PATH'] ?? '');
  if (command === 'codex' || command === 'claude') {
    const client = await resolveClient(command, directories);
    command = client.command;
    args = [...client.prefix, ...args];
  }
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new Failure('E_PROVIDER', 6, 'Agent request cancelled.'));
      return;
    }
    const env = Object.fromEntries(
      Object.entries(process.env).filter(([key]) =>
        /^(PATH|HOME|USERPROFILE|SYSTEMROOT|WINDIR|APPDATA|LOCALAPPDATA|TMPDIR|TMP|TEMP|LANG|LC_ALL|CODEX_HOME|OPENAI_API_KEY|ANTHROPIC_API_KEY|ANTHROPIC_AUTH_TOKEN|HTTPS?_PROXY|NO_PROXY|NODE_EXTRA_CA_CERTS|SSL_CERT_FILE)$/i.test(
          key,
        ),
      ),
    );
    if (pathKey) env[pathKey] = directories.join(path.delimiter);
    const child = spawn(command, args, {
      cwd,
      env,
      shell: false,
      detached: process.platform !== 'win32',
      stdio: ['pipe', 'pipe', 'pipe'],
      windowsHide: true,
    });
    let stdout = '',
      total = 0,
      failed: Failure | undefined,
      force: ReturnType<typeof setTimeout> | undefined;
    const kill = () => {
      try {
        if (process.platform !== 'win32') process.kill(-child.pid!, 'SIGTERM');
        else child.kill('SIGTERM');
      } catch {
        /* already exited */
      }
      force = setTimeout(() => {
        try {
          if (process.platform !== 'win32') process.kill(-child.pid!, 'SIGKILL');
          else child.kill('SIGKILL');
        } catch {
          /* exited */
        }
      }, 1000);
      force.unref();
    };
    const stop = (message: string) => {
      if (!failed) {
        failed = new Failure('E_PROVIDER', 6, message);
        kill();
      }
    };
    const cancel = () => stop('Agent request cancelled.');
    const timer = setTimeout(
      () => stop('Agent exceeded the request time limit; no target document was written.'),
      timeout,
    );
    signal?.addEventListener('abort', cancel, { once: true });
    child.stdout.setEncoding('utf8');
    child.stdout.on('data', (data: string) => {
      total += Buffer.byteLength(data);
      if (total > 512 * 1024) stop('Agent exceeded the output limit.');
      else stdout += data;
    });
    child.stderr.on('data', (data: Buffer) => {
      total += data.length;
      if (total > 512 * 1024) stop('Agent exceeded the output limit.');
    });
    child.on('error', () => {
      failed ??= new Failure(
        'E_PROVIDER',
        6,
        'Agent could not start. Install/authenticate the selected trusted CLI and check its supported flags.',
      );
    });
    child.stdin.on('error', () => {
      /* close/error handler reports the failure without echoing input */
    });
    child.once('close', (code) => {
      clearTimeout(timer);
      if (force) clearTimeout(force);
      signal?.removeEventListener('abort', cancel);
      if (failed) reject(failed);
      else if (code !== 0)
        reject(
          new Failure(
            'E_PROVIDER',
            6,
            'Agent failed. Check authentication, quota, sandbox support, and CLI version using the trusted client directly. Raw agent logs are not exposed.',
          ),
        );
      else resolve(stdout);
    });
    child.stdin.end(input);
  });
};

export async function requestProposal(
  agent: Agent,
  input: string,
  signal?: AbortSignal,
  runner: Runner = runProcess,
): Promise<unknown> {
  if (!['codex', 'claude'].includes(agent))
    throw new Failure('E_CAPABILITY', 2, 'Choose --agent codex or --agent claude.');
  const directory = await fs.realpath(
    await fs.mkdtemp(path.join(os.tmpdir(), 'craftmentation-agent-')),
  );
  try {
    const schema = await bundledText('schemas/proposal.schema.json');
    const schemaPath = path.join(directory, 'response.schema.json');
    await fs.writeFile(schemaPath, schema, { mode: 0o600 });
    const args =
      agent === 'codex'
        ? [
            'exec',
            '--ignore-user-config',
            '--ignore-rules',
            '--ephemeral',
            '--sandbox',
            'read-only',
            '--skip-git-repo-check',
            '--disable',
            'shell_tool',
            '--disable',
            'unified_exec',
            '-c',
            'web_search="disabled"',
            '-c',
            'project_doc_max_bytes=0',
            '--output-schema',
            schemaPath,
            '--json',
            '-',
          ]
        : [
            '--print',
            '--safe-mode',
            '--tools',
            '',
            '--strict-mcp-config',
            '--mcp-config',
            '{"mcpServers":{}}',
            '--disable-slash-commands',
            '--no-session-persistence',
            '--setting-sources',
            '',
            '--settings',
            '{"disableAllHooks":true}',
            '--output-format',
            'json',
            '--json-schema',
            schema,
          ];
    const output = await runner(agent, args, input, directory, signal);
    try {
      if (agent === 'claude') {
        const envelope = strictJSON(output) as {
          is_error?: boolean;
          structured_output?: unknown;
          result?: string;
        };
        if (envelope.is_error) throw new Error('agent failure');
        return envelope.structured_output ?? strictJSON(envelope.result ?? '');
      }
      let answer: string | undefined;
      for (const line of output.split('\n').filter(Boolean)) {
        const event = strictJSON(line) as { type: string; item?: { type: string; text?: string } };
        if (event.type === 'error' || event.type === 'turn.failed')
          throw new Error('agent failure');
        if (event.item && !['agent_message', 'reasoning', 'plan'].includes(event.item.type))
          throw new Error('unexpected tool/event');
        if (event.type === 'item.completed' && event.item?.type === 'agent_message')
          answer = event.item.text;
      }
      return strictJSON(answer ?? '');
    } catch {
      throw new Failure(
        'E_PROVIDER',
        6,
        'Agent did not return a valid structured proposal without tool activity. No target document was written.',
      );
    }
  } finally {
    await fs.rm(directory, { recursive: true, force: true });
  }
}
