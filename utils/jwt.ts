import jwt from "jsonwebtoken";

export function generateNewToken({
  secretKey,
  payload,
}: {
  secretKey: string;
  payload: Record<string, any>;
}) {
  return jwt.sign(payload, secretKey, {
    expiresIn: "1d",
  });
}

export function verifyToken({
  token,
  secretKey,
}: {
  token: string;
  secretKey: string;
}) {
  return jwt.verify(token, secretKey);
}
