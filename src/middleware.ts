import { withAuth } from "next-auth/middleware"
import { Role } from "./types/next-auth.d";
import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

const redirectToDashboardByRole = (roleId?: number): string => {
    const { superAdmin, issuer, verificator, student } = Role;
    switch (roleId) {
        case superAdmin:
            return "/superadmin"
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

export default withAuth(
    function middleware (req) {
        // some actions here
        if (req.nextauth.token?.role) {
            redirectToDashboardByRole(req.nextauth.token?.role)
        }
    },
    {
        callbacks: {
            authorized: ({ req, token }) => {
                const path = req.nextUrl.pathname;

                // Check if the middleware is processing the
                // route which requires a specific role
                if (path.startsWith("/superadmin")) {
                    return token?.role === Role.superAdmin;
                }
                if (path.startsWith("/issuer")) {
                    return token?.role === Role.issuer;
                }
                if (path.startsWith("/verificator")) {
                    return token?.role === Role.verificator;
                }
                if (path.startsWith("/student")) {
                    return token?.role === Role.student;
                }

                // By default return true only if the token is not null
                // (this forces the users to be signed in to access the page)
                return false;
            }
        }
    })

// Define paths for which the middleware will run
export const config = {
    matcher: [
        "/superadmin/:path*",
        "/issuer/:path*",
        "/verificator/:path*",
        "/student/:path*"
    ]
}

const { superAdmin, issuer, verificator, student } = Role;
const protectedPaths = [
    { path: "/superadmin", role: superAdmin },
    { path: "/issuer", role: issuer },
    { path: "/verificator", role: verificator },
    { path: "/student", role: student }
];
const guestPaths = [
    "/auth"
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