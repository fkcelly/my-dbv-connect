import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { jwtVerify } from "jose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Não autorizado" });
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    const user = await prisma.user.findUnique({
        where: { id: String(payload.userId) },
        select: { name: true },
        });


    return res.status(200).json({ user });
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
}
