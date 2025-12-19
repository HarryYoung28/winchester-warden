import { NextResponse } from "next/server";
import { updateWardenLocation } from "@/lib/queries";

export async function POST(req) {

    try {
        const { locationId } = await req.json();

        const userId = req.cookies.get("userId")?.value;
        
        if (!userId || !locationId) {
        return NextResponse.json({ ok: false, error: "Missing userId or locationId" }, 
            { status: 400 }
        );
    }

    await updateWardenLocation(userId, locationId);

    return NextResponse.json({ ok: true });
    } catch (err) {
        return NextResponse.json(
            { ok: false, error: err.message },
            { status: 500 }
        );
    }
}