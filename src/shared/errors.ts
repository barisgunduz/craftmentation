import type { Diagnostic } from './types.js';
export class Failure extends Error {
  constructor(
    public code: string,
    public exitCode: number,
    message: string,
    public path?: string,
    public data: unknown = null,
  ) {
    super(message);
  }
  diagnostic(): Diagnostic {
    return {
      code: this.code,
      severity: 'error',
      message: this.message,
      ...(this.path ? { path: this.path } : {}),
    };
  }
}
export function ioFailure(error: unknown, path?: string): Failure {
  if (error instanceof Failure) return error;
  const code = (error as NodeJS.ErrnoException)?.code;
  if (code === 'EEXIST')
    return new Failure('E_EXISTS', 3, 'Destination or operation lock already exists.', path);
  if (code === 'EACCES' || code === 'EPERM')
    return new Failure('E_PERMISSION', 4, 'Filesystem permission denied.', path);
  if (code === 'ELOOP') return new Failure('E_SYMLINK', 3, 'Symlinks are not allowed.', path);
  return new Failure('E_IO', 4, 'Filesystem operation failed.', path);
}
export const compare = (a: string, b: string): number => (a < b ? -1 : a > b ? 1 : 0);
export const diagnosticsOrder = (a: Diagnostic, b: Diagnostic): number =>
  compare(a.path ?? '', b.path ?? '') ||
  (a.line ?? 0) - (b.line ?? 0) ||
  compare(a.code, b.code) ||
  compare(a.message, b.message);
