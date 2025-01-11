import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const userId = request.cookies.get("userId")?.value;

  if (token && userId) {
    try {
      // Set userId in request headers or response headers
      const response = NextResponse.next();
      response.headers.set("X-User-Id", userId);

      return response;
    } catch (error) {
      console.error("Invalid token:", error);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else {
    // Redirect to login if no token or userId
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// Apply middleware only to specific routes
export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};
