import jwt, { JwtPayload } from "jsonwebtoken";

const ACCESS_EXPIRES = process.env.ACCESS_EXPIRES || "15m";
const REFRESH_EXPIRES = process.env.REFRESH_EXPIRES || "7d";

export function createAccessToken(userId: string) {
  
    return jwt.sign(
    { id: userId },
    process.env.JWT_ACCESS_SECRET!,     // MUST EXIST
    { expiresIn: ACCESS_EXPIRES }
  );
}

export function createRefreshToken(userId: string) {
  return jwt.sign(
    { id: userId },
    process.env.JWT_REFRESH_SECRET!,   // MUST EXIST
    { expiresIn: REFRESH_EXPIRES }
  );
}

export function verifyAccessToken(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as JwtPayload;
  } catch {
    return null;
  }
}

export function verifyRefreshToken(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as JwtPayload;
  } catch {
    return null;
  }
}
