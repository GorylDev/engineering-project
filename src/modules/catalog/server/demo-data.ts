import "server-only";
import type { PrismaClient } from "@/generated/prisma/client";

export const demonstrationPerfume = {
  slug: "przyklad-demonstracyjny",
  name: "Przykład katalogowy Olfunara",
  description:
    "Fikcyjny wpis służący wyłącznie do demonstracji aplikacji. Nie opisuje rzeczywistych perfum, ich nut ani parametrów.",
  isDemo: true,
  sourceLabel: "Własne dane demonstracyjne projektu Olfunara",
} as const;

export async function seedDemonstrationPerfume(database: PrismaClient) {
  return database.perfume.upsert({
    where: { slug: demonstrationPerfume.slug },
    create: demonstrationPerfume,
    update: demonstrationPerfume,
  });
}
