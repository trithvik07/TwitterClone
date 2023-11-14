import serverAuth from "@/utils/serverAuth";
import { NextRequest, NextResponse } from "next/server";

async function POST(req: NextRequest, response: NextResponse) {
  const res = NextResponse;
  try {
    const { userId } = await req.json();
    const currentUser = await serverAuth();
    console.log(typeof userId);
    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid Id");
    }

    const user = await prisma?.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new Error("Invalid ID");
    }
    let updatedFollowingIds = [...(user.followingIds || [])];
    updatedFollowingIds.push(userId);
    try {
      await prisma?.notification.create({
        data: {
          body: "Someone Liked your tweet",
          userId,
        },
      });
      await prisma?.user.update({
        where: {
          id: userId,
        },
        data: {
          hasNotification: true,
        },
      });
    } catch (error) {
      console.log(error);
    }

    const updatedUser = await prisma?.user.update({
      where: {
        id: currentUser?.id,
      },
      data: {
        followingIds: updatedFollowingIds,
      },
    });
    return res.json({ updatedUser }, { status: 200 });
  } catch (error) {
    return res.json({ error }, { status: 400 });
  }
}
export async function DELETE(req: NextRequest) {
  const res = NextResponse;
  try {
    const { userId } = await req.json();
    const currentUser = await serverAuth();
    console.log(typeof userId);
    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid Id");
    }

    const user = await prisma?.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new Error("Invalid ID");
    }
    let updatedFollowingIds = [...(user.followingIds || [])];
    updatedFollowingIds = updatedFollowingIds.filter(
      (followingId) => followingId !== userId
    );

    const updatedUser = await prisma?.user.update({
      where: {
        id: currentUser?.id,
      },
      data: {
        followingIds: updatedFollowingIds,
      },
    });
    return res.json({ updatedUser }, { status: 200 });
  } catch (error) {
    return res.json({ error }, { status: 400 });
  }
}
