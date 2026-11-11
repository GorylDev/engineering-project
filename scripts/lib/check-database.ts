import { Pool } from "pg";

export async function checkLocalDatabase(connectionString: string) {
  const pool = new Pool({
    connectionString,
    max: 1,
    connectionTimeoutMillis: 2000,
    query_timeout: 3000,
  });
  try {
    await pool.query("SELECT 1");
  } catch {
    throw new Error(
      "Lokalny PostgreSQL jest niedostępny. Uruchom właściwy kontener Docker Compose i sprawdź lokalny .env.",
    );
  } finally {
    await pool.end();
  }
}
