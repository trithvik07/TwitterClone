import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const res = NextResponse;
  try {
    const userId = params.userId;
    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid ID");
    }
    const notifications = await prisma?.notification.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    await prisma?.user.update({
      where: {
        id: userId,
      },
      data: {
        hasNotification: false,
      },
    });
    return res.json(notifications, { status: 200 });
  } catch (error) {
    console.log(error);
    return res.json(error, { status: 400 });
  }
}
