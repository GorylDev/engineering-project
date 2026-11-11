import "server-only";
import { parseServerEnvironment } from "@/config/environment";

export function getServerEnvironment() {
  return parseServerEnvironment({
    APP_ENV: process.env.APP_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
  });
}
