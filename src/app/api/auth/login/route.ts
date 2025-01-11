import { envConfig } from "@/envConfig";
import prisma from "@/lib/prisma";
import { generateToken } from "@/utils/generateToken";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = generateToken(user.id, user.role);
    const role = user.role;
    const redirectUrl =
      role === "admin"
        ? `${envConfig.next_public}/admin`
        : `${envConfig.next_public}/user`;

    const response = NextResponse.json(redirectUrl);
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    response.cookies.set("userId", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return response;
  } catch (error) {
    console.log("login route error: ", error);
    return Response.json({ error: "Error during login" }, { status: 500 });
  }
}
