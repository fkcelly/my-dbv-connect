import type { NextApiRequest, NextApiResponse } from "next";
import { getCookie } from "cookies-next";
import { jwtVerify } from "jose";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Pegando o cookie e tipando corretamente
    const token = getCookie("token", { req, res }) as string | undefined;

    if (!token) {
      return res.status(401).json({ message: "Não autenticado." });
    }

    // Decodificando o token com tipagem ajustada
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = (await jwtVerify(token, secret)) as any;

    // Buscando usuário no banco
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { name: true, email: true, createdAt: true },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    return res.status(200).json({ user });

  } catch (err) {
    console.error("Erro ao buscar usuário:", err);
    return res.status(400).json({ message: "Erro ao buscar usuário." });
  }
}
