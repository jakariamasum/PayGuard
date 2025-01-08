/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { envConfig } from "@/envConfig";

export async function GET() {
  try {
    // Use the `cookies` utility to access cookies
    const token = cookies().get("token")?.value;
    console.log("token from me: ", token);

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify the token
    const decoded: any = jwt.verify(token, envConfig.jwt_secret!);
    console.log(decoded);
    const user = await prisma.user.findUnique({
      where: { id: decoded.user_id },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error in /api/auth/me:", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
