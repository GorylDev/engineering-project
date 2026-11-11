import { checkReadiness } from "@/server/health";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const ready = await checkReadiness();
  return Response.json(
    { status: ready ? "ok" : "unavailable" },
    {
      status: ready ? 200 : 503,
      headers: { "Cache-Control": "no-store" },
    },
  );
}
