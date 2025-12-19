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

        // Results in a true or false check of the password hash
        const passwordMatch = await bcrypt.compare(password, user.password_hash);

        // Password doesnt match
        if (!passwordMatch) {
            return NextResponse.json(
                { ok: false, error: "Invalid Password!"},
                { status: 401 }
            );
        }

        // if we reach here, the password hash match is true
        const response = NextResponse.json(
            { ok: true, role: user.role}
        );

        response.cookies.set("loggedIn", "true", { httpOnly: true })
        response.cookies.set("role", user.role, { httpOnly: true })
        response.cookies.set("userId", String(user.user_id), { httpOnly: true })

        return response;

    } catch (err) {
        return NextResponse.json(
            { ok: false, error: err.message },
            {status: 500 }
        );
    }



}
