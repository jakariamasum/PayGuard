import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({ message: "Logged out successfully" });
    response.cookies.set("token", "", { maxAge: 0, path: "/" });
    return response;
  } catch (error) {
    console.error("Error during logout:", error);
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}
