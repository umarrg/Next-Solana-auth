import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { serialize } from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { address } = req.body;

  if (!address) {
    return res.status(400).json({ message: "Address is required" });
  }

  try {
    const user = await prisma.user.upsert({
      where: { address },
      update: {},
      create: { address },
    });

    const sessionToken = generateSessionToken();
    await prisma.user.update({
      where: { address },
      data: { sessionToken },
    });

    res.setHeader(
      "Set-Cookie",
      serialize("session-token", sessionToken, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      })
    );

    return res.status(200).json({ user });
  } catch (error) {
    console.error("API error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

function generateSessionToken() {
  return Math.random().toString(36).substr(2);
}
