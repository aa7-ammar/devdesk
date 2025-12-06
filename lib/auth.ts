import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { ENV } from "./env";

export function createAccessToken(userId: string): string {
  const options: SignOptions = {
    expiresIn: ENV.ACCESS_EXPIRES,
  };

  return jwt.sign(
    { id: userId },
    ENV.JWT_ACCESS_SECRET, // ✅ now guaranteed string
    options
  );
}

export function createRefreshToken(userId: string): string {
  const options: SignOptions = {
    expiresIn: ENV.REFRESH_EXPIRES,
  };

  return jwt.sign(
    { id: userId },
    ENV.JWT_REFRESH_SECRET,
    options
  );
}

export function verifyAccessToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(
      token,
      ENV.JWT_ACCESS_SECRET
    ) as JwtPayload;
  } catch {
    return null;
  }
}

export function verifyRefreshToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(
      token,
      ENV.JWT_REFRESH_SECRET
    ) as JwtPayload;
  } catch {
    return null;
  }
}
