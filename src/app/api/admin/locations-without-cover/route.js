import { NextResponse } from "next/server";
import { getLocationsWithoutCover } from "@/lib/queries";

export async function GET() {
    try {
        const result = await getLocationsWithoutCover();
        return NextResponse.json({ ok: true, data: result.recordset });
    } catch (err) {
        return NextResponse.json(
            { ok: false, error: err.message }, { status: 500 }
        );
    }
}