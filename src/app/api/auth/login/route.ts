import prisma from "@/lib/prisma";
import { generateToken } from "@/utils/generateToken";
import bcrypt from "bcrypt";

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

    const token = generateToken(user.id);

    return Response.json({ message: "Login successful", token });
  } catch (error) {
    console.log("login route error: ", error);
    return Response.json({ error: "Error during login" }, { status: 500 });
  }
}
