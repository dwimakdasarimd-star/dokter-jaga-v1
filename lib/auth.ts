const encoder = new TextEncoder();

function toBase64Url(bytes: Uint8Array) {
  let binary = '';
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function fromBase64Url(value: string) {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((value.length + 3) % 4);
  const binary = atob(padded);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

async function key() {
  const secret = process.env.DOKTER_JAGA_AUTH_SECRET;
  if (!secret) throw new Error('DOKTER_JAGA_AUTH_SECRET is not configured');
  return crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
}

export async function createSessionToken() {
  const payload = toBase64Url(encoder.encode(JSON.stringify({ exp: Date.now() + 1000 * 60 * 60 * 24 * 30 })));
  const signature = toBase64Url(new Uint8Array(await crypto.subtle.sign('HMAC', await key(), encoder.encode(payload))));
  return `${payload}.${signature}`;
}

export async function verifySessionToken(token: string | undefined) {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  try {
    const valid = await crypto.subtle.verify('HMAC', await key(), fromBase64Url(parts[1]), encoder.encode(parts[0]));
    if (!valid) return false;
    const payload = JSON.parse(new TextDecoder().decode(fromBase64Url(parts[0]))) as { exp?: number };
    return typeof payload.exp === 'number' && payload.exp > Date.now();
  } catch {
    return false;
  }
}
