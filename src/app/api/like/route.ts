import serverAuth from "@/utils/serverAuth";
import { NextRequest, NextResponse } from "next/server";

export async function handler(req: NextRequest) {
  const res = NextResponse;
  try {
    const { postId } = await req.json();
    const currentUser = await serverAuth();
    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid ID");
    }
    const post = await prisma?.post.findUnique({
      where: {
        id: postId,
      },
    });
    let updatedLikes = [...(post?.likedIds || [])];
    if (req.method === "POST") {
      updatedLikes.push(currentUser?.id!);
      try {
        const post = await prisma?.post.findUnique({
          where: {
            id: postId,
          },
        });
        if (post?.userId) {
          await prisma?.notification.create({
            data: {
              body: "Someone Followed you ",
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
    } else if (req.method === "DELETE") {
      updatedLikes = updatedLikes.filter((likedId) => {
        likedId !== currentUser?.id;
      });
    }
    const updatedUser = await prisma?.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds: updatedLikes,
      },
    });
    return res.json(updatedUser, { status: 200 });
  } catch (error) {
    console.log(error);
    return res.json(error, { status: 400 });
  }
}

export { handler as POST, handler as DELETE };
