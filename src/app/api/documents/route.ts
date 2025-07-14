import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { envConfig } from "@/envConfig";
import prisma from "@/lib/prisma";
import { Readable } from "stream";

cloudinary.config({
  cloud_name: envConfig.clodinary_cloud_name,
  api_key: envConfig.clodinary_api_key,
  api_secret: envConfig.clodinary_api_secret,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const userId = formData.get("user_id") as string | null;

    if (!file || !userId) {
      return NextResponse.json(
        { error: "File and user ID are required" },
        { status: 400 }
      );
    }

    const originalFileName = file.name;
    const fileExtension = originalFileName.split(".").pop();
    const publicId = `uploads/${originalFileName.replace(/\.[^/.]+$/, "")}`;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload file to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "uploads",
          resource_type: "auto",
          public_id: publicId,
          format: fileExtension,
        },
        (error, result) => {
          if (error) reject(error);
          resolve(result);
        }
      );
      const stream = Readable.from(buffer);
      stream.pipe(uploadStream);
    });

    const { secure_url } = uploadResult as { secure_url: string };

    // Save document metadata to the database
    const document = await prisma.document.create({
      data: {
        file_url: secure_url,
        user_id: userId,
      },
    });

    return NextResponse.json(document, { status: 201 });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("user_id");

  try {
    if (id) {
      // Fetch documents for a specific user
      const user = await prisma.user.findUnique({
        where: {
          id: id,
        },
      });

      if (!user) {
        return NextResponse.json(
          { message: "User does not exist" },
          { status: 404 }
        );
      }

      const userDocuments = await prisma.document.findMany({
        where: {
          user_id: user.id,
        },
        include: {
          user: {
            select: {
              email: true,
              id: true,
            },
          },
        },
      });

      return NextResponse.json(userDocuments, { status: 200 });
    }

    // If no `user_id` is provided, fetch all documents for admin
    const allDocuments = await prisma.document.findMany({
      include: {
        user: true,
      },
    });

    return NextResponse.json(allDocuments, { status: 200 });
  } catch (error) {
    console.error("Error fetching documents:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const { id, status } = await request.json();

  const existingDoc = await prisma.document.findUnique({
    where: {
      id: id!,
    },
  });
  if (!existingDoc) {
    return NextResponse.json({ message: "Doc not found" }, { status: 404 });
  }

  const updateDoc = await prisma.document.update({
    where: {
      id: id,
    },
    data: {
      status: status,
    },
  });
  return NextResponse.json(updateDoc, { status: 201 });
}
