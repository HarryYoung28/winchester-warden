import { NextResponse } from "next/server";

export async function POST() {
    const response = NextResponse.json({ ok: true });

    response.cookies.delete("loggedIn");
    response.cookies.delete("role");
    response.cookies.delete("userId");

    return response;
}