import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export async function GET() {
  try {
    const pool = await getPool();
    const result = await pool.request().query("SELECT 1 AS ok");

    return NextResponse.json({
      connected: true,
      ok: result.recordset?.[0]?.ok,
    });
  } catch (err) {
    return NextResponse.json(
      {
        connected: false,
        error: err.message,
      },
      { status: 500 }
    );
  }
}