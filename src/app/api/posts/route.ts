import serverAuth from "@/utils/serverAuth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const res = NextResponse;
  try {
    const userId = req.nextUrl.searchParams.get("userId");
    let posts;
    if (!userId) {
      posts = await prisma?.post.findMany({
        include: {
          comments: true,
          user: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      posts = await prisma?.post.findMany({
        where: {
          userId: userId as string,
        },
        include: {
          comments: true,
          user: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }
    return res.json(posts, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return res.json(error, {
      status: 400,
    });
  }
}

export async function POST(req: NextRequest) {
  const res = NextResponse;
  try {
    const { body } = await req.json();
    const currentUser = await serverAuth();
    console.log(body);
    if (!body) {
      return res.json("Please provide a body for the post", { status: 400 });
    }
    const post = await prisma?.post.create({
      data: {
        body: body,
        userId: currentUser?.id as string,
      },
    });
    return res.json({ post }, { status: 200 });
  } catch (error) {
    return res.json({ error }, { status: 400 });
  }
}
