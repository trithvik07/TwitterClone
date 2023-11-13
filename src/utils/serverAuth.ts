import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const serverAuth = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return null;
  }
  const currentUser = await prisma?.user.findUnique({
    where: {
      email: session.user.email!,
    },
  });
  if (!currentUser) {
    return null;
  }
  return currentUser;
};

export default serverAuth;
