import { loadProjectEnvironment } from "../scripts/lib/environment";
import { assertLocalDatabase } from "../scripts/lib/database-safety";
import { createDatabaseClient } from "../src/server/database-client";
import { seedDemonstrationPerfume } from "../src/modules/catalog/server/demo-data";

loadProjectEnvironment();

async function main() {
  const mode = process.env.APP_ENV === "test" ? "test" : "development";
  const connectionString = assertLocalDatabase(
    {
      appEnvironment: process.env.APP_ENV,
      nodeEnvironment: process.env.NODE_ENV,
      databaseUrl: process.env.DATABASE_URL,
    },
    mode,
  );
  const database = createDatabaseClient(connectionString);
  try {
    await seedDemonstrationPerfume(database);
    console.info("Zapisano demonstracyjny wpis katalogu; ponowienie nie tworzy duplikatu.");
  } finally {
    await database.$disconnect();
  }
}

main().catch(() => {
  console.error("Nie udało się zapisać danych demonstracyjnych. Sprawdź konfigurację i migracje.");
  process.exitCode = 1;
});
