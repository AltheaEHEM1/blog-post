import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const SESSION_COOKIE = "admin_session";

export function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname;

	const adminPaths = ["/blog_admin", "/category", "/comment"];
	const isAdminRoute = adminPaths.some((path) => pathname.startsWith(path));

	if (!isAdminRoute) {
		return NextResponse.next();
	}

	const session = request.cookies.get(SESSION_COOKIE)?.value;

	if (session !== "authenticated") {
		const loginUrl = new URL("/auth", request.url);
		return NextResponse.redirect(loginUrl);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/blog_admin/:path*", "/category/:path*", "/comment/:path*"],
};
