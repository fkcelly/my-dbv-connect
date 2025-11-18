import prisma from "lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getCookie } from "cookies-next";
import { jwtVerify } from "jose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const token = getCookie("token", { req, res }) as string | undefined;
    if (!token) return res.status(401).json({ message: "Não autenticado." });

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload }: any = await jwtVerify(token, secret);

    const progress = (await prisma.progress.findMany({
      where: { userId: payload.userId },
    })) as any[];

    return res.status(200).json({ progress });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Erro ao carregar progresso." });
  }
}
