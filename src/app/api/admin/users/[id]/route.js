import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { updateUser, deleteUserSafely } from "@/lib/queries";

export async function PUT(req, context) {
    try {
        const cookieStore = await cookies();
        const loggedIn = cookieStore.get("loggedIn")?.value;
        const cookieRole = cookieStore.get("role")?.value;

        if (loggedIn !== "true" || cookieRole !== "admin" ) {
            return NextResponse.json(
                { ok: false, error: "Not authorised!" },
                { status: 401 }
            );
        }

        const { id } = await context.params;
        const userId = Number(id);
        if (!userId) {
            return NextResponse.json(
                { ok: false, error: "Invalid user id" },
                { status: 400 }
            );
        }

        const body = await req.json();
        const { staffNumber, firstName, lastName, email } = body;

        if (!staffNumber || !firstName || !lastName || !email) {
            return NextResponse.json(
                { ok: false, error: "Missing field(s)!" },
                { status: 400 }
            );
        }

        await updateUser( userId, {
            staffNumber,
            firstName,
            lastName,
            email,
            role: "warden"
        });

        return NextResponse.json(
            { ok: true }
        );
    } catch (err) {
        return NextResponse.json(
            { ok: false, error: err.message },
            { status: 500 }
        );
    }
}

export async function DELETE(req, context) {
    try {
        const cookieStore = await cookies();
        const loggedIn = cookieStore.get("loggedIn")?.value;
        const cookieRole = cookieStore.get("role")?.value;

        if (loggedIn !== "true" || cookieRole !== "admin" ) {
            return NextResponse.json(
                { ok: false, error: "Not authorised!" },
                { status: 401 }
            );
        }

        const { id } = await context.params;
        const userId = Number(id);
        if (!userId) {
            return NextResponse.json(
                { ok: false, error: "Invalid user id" },
                { status: 400 }
            );
        }

        await deleteUserSafely(userId);

        return NextResponse.json(
            { ok: true }
        );
    } catch (err) {
        return NextResponse.json(
            { ok: false, error: err.message },
            { status: 500 }
        );
    }
}