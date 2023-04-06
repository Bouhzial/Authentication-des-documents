import { withAuth } from "next-auth/middleware"
import { Role } from "./types/types";
import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

const redirectToDashboardByRole = (roleId?: number): string => {
    const { superAdmin, issuer, verificator, student } = Role;
    switch (roleId) {
        case superAdmin:
            return "/superadmin/gerer_users"
        case issuer:
            return "/issuer"
        case verificator:
            return "/verificator"
        case student:
            return "/student"
        default:
            return "/auth"
    }
}

const { superAdmin, issuer, verificator, student } = Role;
const protectedPaths = [
    { path: "/superadmin", role: superAdmin },
    { path: "/issuer", role: issuer },
    { path: "/verificator", role: verificator },
    { path: "/student", role: student }
];
const guestPaths = [
    "/auth",
    "/config_pass"
];
export async function middleware (request: NextRequest, _next: NextFetchEvent) {
    const { pathname } = request.nextUrl;

    const matchesProtectedPath = protectedPaths.some(({ path }) =>
        pathname.startsWith(path)
    );
    if (matchesProtectedPath) {
        const token = await getToken({ req: request });

        if (!token) {
            return NextResponse.redirect(new URL(`/auth`, request.url));
        }
        const route = protectedPaths.find(item => item.role === token.role)
        if (!route || !pathname.startsWith(route.path)) {
            return NextResponse.redirect(new URL(redirectToDashboardByRole(token?.role), request.url));
        }
    }
    const matchesGuestPaths = guestPaths.some((path) =>
        pathname.startsWith(path)
    );

    if (matchesGuestPaths) {
        const token = await getToken({ req: request });
        if (token) {
            return NextResponse.redirect(new URL(redirectToDashboardByRole(token?.role), request.url));
        }
    }
    return NextResponse.next();
}