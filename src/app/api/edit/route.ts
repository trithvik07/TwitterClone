import serverAuth from "@/utils/serverAuth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  const res = NextResponse;
  try {
    const currentUser = await serverAuth();
    const { name, username, bio, profileImage, coverImage } = await req.json();
    if (!name || !username) {
      return res.json("Feilds required", { status: 400 });
    }
    const updatedUser = await prisma?.user.update({
      where: {
        id: currentUser?.id,
      },
      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      },
    });
    return res.json(updatedUser, { status: 200 });
  } catch (error) {
    console.log(error);
    return res.json(error, { status: 400 });
  }
}
