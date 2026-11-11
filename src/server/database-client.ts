import "server-only";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

export function createDatabaseClient(connectionString: string) {
  const adapter = new PrismaPg({
    connectionString,
    max: 5,
    connectionTimeoutMillis: 2000,
    idleTimeoutMillis: 10000,
    query_timeout: 5000,
  });
  return new PrismaClient({ adapter, log: [] });
}
