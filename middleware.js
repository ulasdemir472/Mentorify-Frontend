import { NextResponse } from "next/server";

export async function middleware(request) {
  let token;
  const { pathname, protocol, host } = request.nextUrl;

  // Define the paths that require token validation
  const protectedPaths = [
    "/dashboard",
    "/profile",
    "/messages",
    "/mentor-profile",
    "/wishlist",
    "/settings",
  ];

  // Check if the current path starts with any of the protected paths
  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  // If it's a protected path, validate the token
  const cookie = request.cookies.get("token");
  cookie !== undefined
    ? (token = cookie)
    : NextResponse.redirect(`${protocol}//${host}/login`);

  const isValidToken = await validateToken(token);

  if (isProtectedPath) {
    if (!isValidToken) {
      //If the token is invalid, redirect to the login page or another appropriate page
      return NextResponse.redirect(`${protocol}//${host}/login`);
    }
  }

  // Allow the request to continue
  return NextResponse.next();
}

const validateToken = async (token) => {
  //add request logic for validating the token
  if (token) return true;
  return false;
};

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/messages/:path*",
    "/mentor-profile/:path*",
    "/wishlist/:path*",
  ],
};
