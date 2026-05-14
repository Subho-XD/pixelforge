'use server'

export async function verifyPasscode(input: string): Promise<{ ok: boolean }> {
  const secret = process.env.GATEKEEPER_PASSCODE;

  if (!secret) {
    // If env var is not set, fail closed (deny access)
    console.error('GATEKEEPER_PASSCODE is not configured');
    return { ok: false };
  }

  return { ok: input.trim() === secret.trim() };
}
