// pages/api/devocional/toggle.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { jwtVerify } from "jose";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido." });
  }

  try {
    // --- LER O TOKEN MANUALMENTE (solução total do Next 16)
    const rawCookies = req.headers.cookie ?? "";

    if (!rawCookies.includes("token=")) {
      return res.status(401).json({ message: "Não autenticado." });
    }

    const token =
      rawCookies
        .split(";")
        .map((c) => c.trim())
        .find((c) => c.startsWith("token="))
        ?.split("=")[1] ?? "";

    if (!token) {
      return res.status(401).json({ message: "Não autenticado." });
    }

    // --- VALIDAR TOKEN
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload }: any = await jwtVerify(token, secret);

    const { date } = req.body;

    if (!date) {
      return res.status(400).json({ message: "Data não enviada." });
    }

    // Procurar entrada existente
    const existing = await prisma.devocional.findFirst({
      where: { userId: payload.userId, date },
    });

    if (!existing) {
      // Criar nova entrada
      await prisma.devocional.create({
        data: {
          userId: payload.userId,
          date,
          done: true,
        },
      });
    } else {
      // Alternar done
      await prisma.devocional.update({
        where: { id: existing.id },
        data: { done: !existing.done },
      });
    }

    return res.status(200).json({ ok: true });

  } catch (err) {
    console.error("ERRO NO TOGGLE:", err);
    return res.status(500).json({ message: "Erro interno." });
  }
}
