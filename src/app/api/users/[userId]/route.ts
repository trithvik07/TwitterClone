import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const res = NextResponse;
  try {
    const userId = params.userId;
    if (!userId) {
      return res.json({ message: "Invalid user" }, { status: 404 });
    }
    const exsistingUser = await prisma?.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!exsistingUser) {
      return res.json({ message: "Invalid user" }, { status: 404 });
    }
    const followerCount = await prisma?.user.count({
      where: {
        followingIds: {
          has: userId,
        },
      },
    });
    return res.json({ ...exsistingUser, followerCount }, { status: 200 });
  } catch (error) {
    console.log(error);
    res.json(error, { status: 400 });
  }
}
