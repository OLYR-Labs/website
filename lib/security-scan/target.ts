import dns from "dns/promises";

const MAX_URL_LENGTH = 2048;

function isPrivateIpv4(value: string) {
  const parts = value.split(".").map(Number);
  if (parts.length !== 4 || parts.some((part) => !Number.isInteger(part) || part < 0 || part > 255)) return false;
  const [a, b] = parts;
  return a === 0 || a === 10 || a === 127 || (a === 100 && b >= 64 && b <= 127) || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && (b === 0 || b === 168)) || (a === 198 && b >= 18 && b <= 19);
}

function isPrivateIpv6(value: string) {
  const normalized = value.toLowerCase();
  return normalized === "::" || normalized === "::1" || normalized.startsWith("fc") || normalized.startsWith("fd") || normalized.startsWith("fe8") || normalized.startsWith("fe9") || normalized.startsWith("fea") || normalized.startsWith("feb") || normalized.startsWith("ff");
}

function isPrivateIp(value: string) {
  return isPrivateIpv4(value) || isPrivateIpv6(value);
}

function blockedHostname(hostname: string) {
  const value = hostname.toLowerCase().replace(/\.$/, "");
  return value === "localhost" || value.endsWith(".localhost") || value.endsWith(".local") || value.endsWith(".internal") || value.endsWith(".home.arpa");
}

export async function validateScanTarget(input: unknown) {
  if (typeof input !== "string" || !input.trim() || input.length > MAX_URL_LENGTH) throw new Error("INVALID_TARGET");
  const value = input.trim();
  const target = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
  if (!/^https?:$/.test(target.protocol)) throw new Error("INVALID_PROTOCOL");
  if (target.username || target.password) throw new Error("CREDENTIALS_NOT_ALLOWED");
  if (target.port && target.port !== "80" && target.port !== "443") throw new Error("PORT_NOT_ALLOWED");
  if (blockedHostname(target.hostname) || isPrivateIp(target.hostname)) throw new Error("BLOCKED_TARGET");

  const addresses = await dns.lookup(target.hostname, { all: true, verbatim: true });
  if (!addresses.length || addresses.some((entry) => isPrivateIp(entry.address))) throw new Error("BLOCKED_TARGET");
  return target;
}

export function isSafeResolvedAddress(address: string) {
  return !isPrivateIp(address);
}
