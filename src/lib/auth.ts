import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "./prisma";

export async function authenticate(req: NextApiRequest, res: NextApiResponse) {
  const session: any = await getSession({ req });

  if (!session) {
    res.status(401).json({ message: "Not authenticated" });
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { address: session.user.address },
  });

  if (!user) {
    res.status(401).json({ message: "User not found" });
    return null;
  }

  return user;
}
