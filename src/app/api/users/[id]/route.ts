import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  // Validate the ID
  if (!id) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }
  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
      include: {
        payments: {
          orderBy: { created_at: "desc" },
        },
        documents: {
          orderBy: { uploaded_at: "desc" },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User does not exits" },
        { status: 404 }
      );
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error getting user:", error);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  // Validate the ID
  if (!id) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    // Check if the user exists
    const existingUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 404 }
      );
    }

    // Delete the user

    await prisma.user.delete({
      where: {
        id,
      },
    });

    revalidateTag("users");

    // Respond with success message
    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting user:", error);

    // Handle Prisma-specific errors if necessary
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
