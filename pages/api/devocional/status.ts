import prisma from "@/lib/prisma";
import { getCookie } from "cookies-next";
import { jwtVerify } from "jose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const token = getCookie("token", { req, res }) as string | undefined;
    if (!token) return res.status(401).json({ done: false });

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload }: any = await jwtVerify(token, secret);

    const date = req.query.date as string;

    const entry = await prisma.devocional.findFirst({
      where: { userId: payload.userId, date },
    });

    return res.status(200).json({ done: entry?.done ?? false });
  } catch (e) {
    return res.status(500).json({ done: false });
  }
}
