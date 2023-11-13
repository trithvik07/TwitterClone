import serverAuth from "@/utils/serverAuth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const res = NextResponse;
  try {
    const currentUser = await serverAuth();
    const { body } = await req.json();
    const postId = req.nextUrl.searchParams.get("postId");
    if (!body) {
      throw new Error("Please enter some text");
    }
    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid ID");
    }
    const comment = await prisma?.comment.create({
      data: {
        body,
        userId: currentUser?.id as string,
        postId,
      },
    });
    try {
      const post = await prisma?.post.findUnique({
        where: {
          id: postId,
        },
      });
      if (post?.userId) {
        await prisma?.notification.create({
          data: {
            body: "Someone commented on your tweet",
            userId: post.userId,
          },
        });
        await prisma?.user.update({
          where: {
            id: post.userId,
          },
          data: {
            hasNotification: true,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
    return res.json(comment, { status: 200 });
  } catch (error) {
    return res.json("Error Occured", { status: 400 });
  }
}
