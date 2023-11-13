import bcrypt from "bcrypt";
import prisma from "@/utils/prismadb";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  const res = NextResponse;
  try {
    const { email, username, name, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma?.user.create({
      data: {
        email,
        username,
        name,
        hashedPassword,
      },
    });
    return res.json({ user }, { status: 200 });
  } catch (error) {
    console.log(error);
    return res.json({ error }, { status: 400 });
  }
}
