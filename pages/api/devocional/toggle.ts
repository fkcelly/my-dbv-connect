import prisma from "@/lib/prisma";
import { getCookie } from "cookies-next";
import { jwtVerify } from "jose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const token = getCookie("token", { req, res }) as string | undefined;
    if (!token) return res.status(401).json({ message: "não autenticado" });

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload }: any = await jwtVerify(token, secret);

    const { date } = req.body;

    const entry = await prisma.devocional.findFirst({
      where: { userId: payload.userId, date },
    });

    if (!entry) {
      await prisma.devocional.create({
        data: {
          userId: payload.userId,
          date,
          done: true,
        },
      });
    } else {
      await prisma.devocional.update({
        where: { id: entry.id },
        data: { done: !entry.done },
      });
    }

    return res.status(200).json({ message: "atualizado" });
  } catch {
    return res.status(500).json({ message: "erro" });
  }
}
