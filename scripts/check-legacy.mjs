import { spawnSync } from 'node:child_process';
let selected;
for (const candidate of process.platform === 'win32'
  ? ['python', 'python3', 'py']
  : ['python3', 'python']) {
  const probe = spawnSync(candidate, ['--version'], { encoding: 'utf8' });
  const match = /^Python 3\.(\d+)/.exec(probe.stdout ?? '');
  if (!probe.error && probe.status === 0 && match && Number(match[1]) >= 9) {
    selected = candidate;
    break;
  }
}
if (!selected) {
  console.error('Python 3.9+ is required for development checks.');
  process.exitCode = 1;
} else {
  for (const args of [
    ['scripts/check_template_library.py'],
    ['-m', 'unittest', 'discover', '-s', 'tests', '-p', 'test_*.py'],
  ]) {
    const result = spawnSync(selected, args, {
      stdio: 'inherit',
      env: {
        ...process.env,
        PYTHONUTF8: '1',
        PYTHONIOENCODING: 'utf-8',
        PYTHONDONTWRITEBYTECODE: '1',
      },
    });
    if (result.error || result.status !== 0) {
      process.exitCode = 1;
      break;
    }
  }
}
