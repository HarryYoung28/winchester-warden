import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { loginUserQuery } from "@/lib/queries";

export async function POST(req) {
    try {
        const { staffNumber, password } = await req.json();

        if (!staffNumber || !password ) {
            return NextResponse.json(
                { ok: false, error: "Missing Staff Number or Password!" },
                { status: 400 }
            );
        }

        const result = await loginUserQuery(staffNumber);
        const users = result.recordset;

        if (!users || users.length === 0 ) {
            return NextResponse.json(
                { ok: false, error: "Invalid Staff Number or Password!" },
                { status: 401 }
            );
        }

        const user = users[0];

        const passwordMatch = await bcrypt.compare(password, user.password_hash);

        if (!passwordMatch) {
            return NextResponse.json(
                { ok: false, error: "Invalid Password!"},
                { status: 401 }
            );
        }

        return NextResponse.json(
            { ok: true, role: user.role}
        );
    } catch (err) {
        return NextResponse.json(
            { ok: false, error: err.message },
            {status: 500 }
        );
    }



}
