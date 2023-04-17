import { withAuth } from "next-auth/middleware"
import { Role } from "./types/types";
import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { env } from "./env/server.mjs";

const redirectToDashboardByRole = (roleId?: number): string => {
    const { superAdmin, issuer, verificator, student } = Role;
    switch (roleId) {
        case superAdmin:
            return "/superadmin/gerer_users"
        case issuer:
            return "/issuer/creer_diplome"
        case verificator:
            return "/verificator/verifier_diplome"
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
    "/config_pass/"
];
export async function middleware (req: NextRequest, _next: NextFetchEvent) {
    const { pathname } = req.nextUrl;

    const matchesProtectedPath = protectedPaths.some(({ path }) =>
        pathname.startsWith(path)
    );
    if (matchesProtectedPath) {
        const secret = env.NEXTAUTH_SECRET;
        const token = await getToken({ req ,secret });
        if (!token) {
            return NextResponse.redirect(new URL(`/auth/superadmin`, req.url));
        }
        const route = protectedPaths.find(item => item.role === token.role)
        if (!route || !pathname.startsWith(route.path)) {
            return NextResponse.redirect(new URL(redirectToDashboardByRole(token?.role), req.url));
        }
    }
    const matchesGuestPaths = guestPaths.some((path) =>
        pathname.startsWith(path)
    );

    if (matchesGuestPaths) {
        const token = await getToken({ req: req });
        if (token) {
            return NextResponse.redirect(new URL(redirectToDashboardByRole(token?.role), req.url));
        }
    }
    return NextResponse.next();
}