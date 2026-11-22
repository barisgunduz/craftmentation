// Conservative heuristics, not a secret scanner or prompt-injection classifier.
export function unsafeText(value: string): boolean {
  return /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY|\b(?:sk-[a-zA-Z0-9]{20,}|gh[pousr]_[a-zA-Z0-9]{20,}|AKIA[A-Z0-9]{16})\b|(?:password|secret|api[_-]?key|access[_-]?token)\s*[=:]\s*["']?[^\s"']{8,}|ignore (?:all |the |previous |prior )*(?:instructions|authorized)|(?:reveal|expose|upload).{0,35}(?:credentials|secrets|repository contents)/i.test(
    value,
  );
}
export function escapeMarkdown(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/([\\`*_{}\[\]()#+.!|~-])/g, '\\$1');
}
