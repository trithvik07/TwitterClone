import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import serverAuth from "@/utils/serverAuth";

export async function GET(req: NextRequest) {
  const res = NextResponse;
  const currentUser = await serverAuth();
  return res.json(currentUser);
}
