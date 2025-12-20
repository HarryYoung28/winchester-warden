import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAllWardens, createNewUser } from "@/lib/queries";
import bcrypt from "bcryptjs";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const loggedIn = cookieStore.get("loggedIn")?.value;
        const role = cookieStore.get("role")?.value;

        if (loggedIn !== "true" || role !== "admin") {
            return NextResponse.json(
                { ok: false, error: "Not authorised!" },
                { status: 401 }
            );
        }

        const result = await getAllWardens();
        return NextResponse.json(
            { ok: true, data: result.recordset }
        );

    } catch (err) {
        return NextResponse.json(
            { ok: false, error: err.message },
            { status: 500 }
        );
    }
}

export async function POST(req) {
    try {
        const cookieStore = await cookies();
        const loggedIn = cookieStore.get("loggedIn")?.value;
        const role = cookieStore.get("role")?.value;

        if (loggedIn !== "true" || role !== "admin") {
            return NextResponse.json(
                { ok: false, error: "Not authorised" },
                { status: 401 }
            );
        }

        const body = await req.json();

        const { staffNumber, firstName, lastName, email, password } = body;

        if (!staffNumber || !firstName || !lastName || !email || !password) {
            return NextResponse.json(
                { ok: false, error: "Missing field(s)" },
                { status: 400 }
            );
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newUserId = await createNewUser({
            staffNumber,
            firstName,
            lastName,
            email,
            role: "warden",
            passwordHash
        });

        return NextResponse.json(
            { ok: true, user_id: newUserId }
        );
    } catch (err) {
        return NextResponse.json(
            { ok: false, error: err.message },
            { status: 500 }
        );
    }
}