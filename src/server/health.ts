import "server-only";
import { getDatabase } from "./database";

export async function checkReadiness(): Promise<boolean> {
  try {
    await getDatabase().perfume.findFirst({ select: { id: true } });
    return true;
  } catch {
    return false;
  }
}
