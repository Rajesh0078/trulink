import { cookies } from "next/headers";
import { NextResponse } from "next/server";
const PROTECTED_ROUTES = [
  "/discover",
  "/profile",
  "/profile/edit",
  "/settings",
  "/chat",
  "/match",
  "/notifications",
];
export async function proxy(req, res) {
  const { pathname } = req.nextUrl;
  const cookieStore = await cookies();
  const hasCookie = cookieStore.has("TRULINK_ACCESS_TOKEN");
  const isProtectedRoute = PROTECTED_ROUTES.includes(pathname);

  if (isProtectedRoute && !hasCookie) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!isProtectedRoute && hasCookie) {
    return NextResponse.redirect(new URL("/discover", req.url));
  }
}

export const config = {
  matcher: [
    // Exclude API routes, static files, image optimizations, and .png files
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
  ],
};
