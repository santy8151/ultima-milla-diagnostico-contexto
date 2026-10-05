import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    application: "ruta-clara",
    persistence: process.env.DATABASE_URL ? "postgresql" : process.env.VERCEL ? "not-configured" : "local-json",
  });
}
