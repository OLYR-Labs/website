const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const REQUEST_BODY_LIMIT = 32 * 1024;

export function isValidEmail(value: string): boolean {
  return value.length <= 254 && EMAIL_PATTERN.test(value);
}

export function cleanText(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function hasOversizedBody(request: Request): boolean {
  const contentLength = request.headers.get("content-length");
  return !!contentLength && Number.isFinite(Number(contentLength)) && Number(contentLength) > REQUEST_BODY_LIMIT;
}
