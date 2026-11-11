import "server-only";
import type { PrismaClient } from "@/generated/prisma/client";
import { getDatabase } from "@/server/database";

export async function listDemonstrationPerfumes(database: PrismaClient = getDatabase()) {
  return database.perfume.findMany({
    where: { isDemo: true },
    select: { slug: true, name: true, description: true, isDemo: true, sourceLabel: true },
    orderBy: [{ name: "asc" }, { slug: "asc" }],
    take: 20,
  });
}
