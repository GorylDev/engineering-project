import { z } from "zod";

export const databaseUrlSchema = z
  .string()
  .min(1)
  .refine((value) => {
    try {
      const url = new URL(value);
      return (
        ["postgres:", "postgresql:"].includes(url.protocol) &&
        Boolean(url.hostname && url.username && url.password && url.pathname.length > 1) &&
        !url.hash
      );
    } catch {
      return false;
    }
  }, "Wymagany poprawny adres PostgreSQL z nazwą bazy i danymi logowania.");

const serverEnvironmentSchema = z.object({
  APP_ENV: z.enum(["development", "test", "production"]),
  DATABASE_URL: databaseUrlSchema,
});

export function parseServerEnvironment(input: Record<string, unknown>) {
  const result = serverEnvironmentSchema.safeParse(input);
  if (!result.success) {
    const fields = [...new Set(result.error.issues.map((issue) => String(issue.path[0])))];
    throw new Error(`Nieprawidłowa konfiguracja środowiska: ${fields.join(", ")}.`);
  }
  return result.data;
}
