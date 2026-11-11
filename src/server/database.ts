import "server-only";
import { createDatabaseClient } from "./database-client";
import { getServerEnvironment } from "./environment";

const globalDatabase = globalThis as unknown as {
  olfunaraDatabase?: ReturnType<typeof createDatabaseClient>;
};

export function getDatabase() {
  if (!globalDatabase.olfunaraDatabase) {
    const { DATABASE_URL } = getServerEnvironment();
    globalDatabase.olfunaraDatabase = createDatabaseClient(DATABASE_URL);
  }
  return globalDatabase.olfunaraDatabase;
}
