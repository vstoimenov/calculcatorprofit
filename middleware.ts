import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET
  });
  const isAppRoute = [
    "/dashboard",
    "/daily-input",
    "/daily-tracking",
    "/products",
    "/orders",
    "/ad-spend",
    "/expenses",
    "/imports",
    "/reports",
    "/settings",
    "/alerts"
  ].some((prefix) => pathname.startsWith(prefix));
  const isProtectedApiRoute = [
    "/api/reports",
    "/api/imports"
  ].some((prefix) => pathname.startsWith(prefix));

  if (isAppRoute && !token) {
    const loginUrl = new URL("/login", request.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return Response.redirect(loginUrl);
  }

  if (isProtectedApiRoute && !token) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  if ((pathname === "/login" || pathname === "/register") && token) {
    return Response.redirect(new URL("/dashboard", request.nextUrl.origin));
  }

  return undefined;
}

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"]
};
