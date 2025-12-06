
import type { StringValue } from "ms";

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export const ENV = {
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
  ACCESS_EXPIRES: process.env.ACCESS_EXPIRES as StringValue,
  REFRESH_EXPIRES: process.env.REFRESH_EXPIRES as StringValue,
};
