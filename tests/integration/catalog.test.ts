import { randomUUID } from "node:crypto";
import { afterAll, describe, expect, it } from "vitest";
import { assertLocalDatabase } from "../../scripts/lib/database-safety";
import { createDatabaseClient } from "../../src/server/database-client";
import {
  demonstrationPerfume,
  seedDemonstrationPerfume,
} from "../../src/modules/catalog/server/demo-data";
import { listDemonstrationPerfumes } from "../../src/modules/catalog/server/queries";

const connectionString = assertLocalDatabase(
  {
    appEnvironment: process.env.APP_ENV,
    nodeEnvironment: process.env.NODE_ENV,
    databaseUrl: process.env.DATABASE_URL,
  },
  "test",
);
const database = createDatabaseClient(connectionString);
const prefix = `integration-${randomUUID()}`;

afterAll(async () => {
  try {
    await database.perfume.deleteMany({ where: { slug: { startsWith: prefix } } });
  } finally {
    await database.$disconnect();
  }
});

describe("migracja i katalog w prawdziwym PostgreSQL", () => {
  it("pracuje na PostgreSQL i zmigrowanej tabeli", async () => {
    const version = await database.$queryRaw<{ version: string }[]>`SELECT version()`;
    expect(version[0]?.version).toMatch(/^PostgreSQL 18\./);
    await expect(database.perfume.count()).resolves.toBeGreaterThanOrEqual(1);
  });
  it("seed jest idempotentny", async () => {
    const first = await seedDemonstrationPerfume(database);
    const second = await seedDemonstrationPerfume(database);
    expect(first.id).toBe(second.id);
    expect(await database.perfume.count({ where: { slug: demonstrationPerfume.slug } })).toBe(1);
  });
  it("odczyt modułu zwraca rekord z bazy, bez pozycji niedemonstracyjnych", async () => {
    const visible = await database.perfume.create({
      data: {
        ...demonstrationPerfume,
        slug: `${prefix}-visible`,
        name: "Test odczytu PostgreSQL",
      },
    });
    const hidden = await database.perfume.create({
      data: {
        ...demonstrationPerfume,
        slug: `${prefix}-hidden`,
        isDemo: false,
      },
    });
    const rows = await listDemonstrationPerfumes(database);
    expect(rows.some((row) => row.slug === visible.slug && row.name === visible.name)).toBe(true);
    expect(rows.some((row) => row.slug === hidden.slug)).toBe(false);
  });
  it("baza odrzuca duplikat identyfikatora katalogowego", async () => {
    await expect(database.perfume.create({ data: demonstrationPerfume })).rejects.toThrow();
    expect(await database.perfume.count({ where: { slug: demonstrationPerfume.slug } })).toBe(1);
  });
  it.each([{ name: "   " }, { sourceLabel: " " }, { slug: "INVALID SLUG" }, { description: " " }])(
    "ograniczenia bazy odrzucają niepoprawne dane: %j",
    async (invalidFields) => {
      await expect(
        database.perfume.create({
          data: {
            ...demonstrationPerfume,
            slug: `${prefix}-${randomUUID()}`,
            ...invalidFields,
          },
        }),
      ).rejects.toThrow();
      await expect(database.perfume.count()).resolves.toBeGreaterThanOrEqual(1);
    },
  );
  it("nie zatwierdza częściowego zapisu po błędzie transakcji", async () => {
    const slug = `${prefix}-rollback`;
    await expect(
      database.$transaction(async (transaction) => {
        await transaction.perfume.create({ data: { ...demonstrationPerfume, slug } });
        throw new Error("Kontrolowane przerwanie testu transakcji");
      }),
    ).rejects.toThrow("Kontrolowane przerwanie");
    expect(await database.perfume.count({ where: { slug } })).toBe(0);
  });
});
