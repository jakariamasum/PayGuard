/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from "@/lib/prisma";
import { generateToken } from "@/utils/generateToken";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }

    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    const token = generateToken(user.id);
    cookies().set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return Response.json({ message: "Signup successful", token });
  } catch (error) {
    return Response.json({ error: "Error during signup" }, { status: 500 });
  }
}
