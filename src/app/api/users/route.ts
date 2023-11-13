import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const res = NextResponse;
  try {
    const users = await prisma?.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.json(users, { status: 200 });
  } catch (error) {
    console.log(error);
    return res.json(error, { status: 400 });
  }
}
