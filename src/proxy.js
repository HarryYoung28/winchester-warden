import { NextResponse } from "next/server";

export function proxy(request) {
    const { pathname } = request.nextUrl;

    // get cookies value IF they exist (a login attempt has to be made)

    const loggedIn = request.cookies.get("loggedIn")?.value;
    const role = request.cookies.get("role")?.value;

    if (pathname.startsWith("/login")) {
        return NextResponse.next();
    }

    const isProtected = pathname.startsWith("/admin") || pathname.startsWith("/warden")

    if (isProtected && !loggedIn ) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // only admins need admin access
    if (pathname.startsWith("/admin") && role !== "admin") {
        return NextResponse.redirect(new URL("/warden", request.url));
    }

    if (pathname === "/admin") {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }   

    // only wardens need warden access
    if (pathname.startsWith("/warden") && role !== "warden") {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/warden/:path*", "/login/:path*"]
};