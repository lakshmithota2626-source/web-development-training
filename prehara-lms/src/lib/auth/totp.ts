import * as OTPAuth from 'otpauth';

export function generateTotpSecret(issuer: string, userEmail: string): { secret: string; otpauthUrl: string } {
  const totp = new OTPAuth.TOTP({
    issuer,
    label: userEmail,
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    secret: new OTPAuth.Secret({ size: 20 }),
  });

  return {
    secret: totp.secret.base32,
    otpauthUrl: totp.toString(),
  };
}

export function verifyTotpToken(secretBase32: string, token: string): boolean {
  const totp = new OTPAuth.TOTP({
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    secret: OTPAuth.Secret.fromBase32(secretBase32),
  });

  const delta = totp.validate({
    token: token.trim(),
    window: 1, // Allow 30 seconds clock drift
  });

  return delta !== null;
}
