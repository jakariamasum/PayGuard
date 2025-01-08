/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { envConfig } from "./envConfig";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get the token from cookies
  const token = request.cookies.get("token")?.value;
  console.log("token from mdlr: ", token);

  // If no token is found, redirect to the homepage
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    // Verify the token
    const decoded: any = jwt.verify(token, envConfig.jwt_secret!);
    const userRole = decoded.role;
    console.log("decoded role: ", userRole);

    // Redirect logic based on role and route
    if (pathname.startsWith("/admin")) {
      // Prevent users from accessing admin routes
      if (userRole !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } else if (pathname.startsWith("/user")) {
      // Prevent admins from accessing user routes
      if (userRole !== "user") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
  } catch (error) {
    // If token verification fails, redirect to the homepage
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow the request if no issues
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};
