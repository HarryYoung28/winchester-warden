import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getThisWardensWhereabouts } from "@/lib/queries";

export async function GET() {
    try {
        const cookieStorage = await cookies();
        const userId = cookieStorage.get("userId")?.value;

        if (!userId) {
            return NextResponse.json(
                { ok: false, error: "Not logged in!" }, { status: 401 }
            );
        } 

        const result = await getThisWardensWhereabouts(userId);
        const row = result.recordset?.[0]; 
        
        if (!row) {
            return NextResponse.json(
                { ok: false, error: "No status found for this warden" }, { status: 404 }
            );
        }

        return NextResponse.json({ ok: true, data: row });
    } catch (err) {
        return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
    }
}