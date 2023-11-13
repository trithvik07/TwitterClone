import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prismadb";
export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const res = NextResponse;
  try {
    const postId = params.postId;
    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid ID");
    }
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: true,
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    return res.json(post, { status: 200 });
  } catch (error) {
    console.log(error);

    return res.json({ error }, { status: 400 });
  }
}
