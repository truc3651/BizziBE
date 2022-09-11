import crypto from "crypto";

export function generateSalt() {
  return crypto.randomBytes(16).toString("hex");
}

export function hashPassword({
  salt,
  password,
}: {
  salt: string;
  password: string;
}) {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
}

export function verifyPassword({
  hashedPassword,
  plainPassword,
  salt,
}: {
  hashedPassword: string;
  plainPassword: string;
  salt: string;
}) {
  const hash = crypto
    .pbkdf2Sync(plainPassword, salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return hash === hashedPassword;
}
