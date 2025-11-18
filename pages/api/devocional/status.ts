import type { NextApiRequest, NextApiResponse } from "next";
import { jwtVerify } from "jose";
import prisma from "@/lib/prisma";

// Tipo dos registros retornados pelo banco
type DevocionalRegistro = {
  date: string;
  done: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Lê cookies manualmente (Next.js 16 req.headers.cookie)
    const rawCookies = req.headers.cookie ?? "";

    if (!rawCookies.includes("token=")) {
      console.log("Nenhum token encontrado nos cookies:", rawCookies);
      return res.status(401).json({ message: "Não autenticado." });
    }

    // Extrai o token
    const token =
      rawCookies
        .split(";")
        .map((c) => c.trim())
        .find((c) => c.startsWith("token="))
        ?.split("=")[1] ?? "";

    if (!token) {
      return res.status(401).json({ message: "Não autenticado." });
    }

    // Decodifica JWT
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload }: any = await jwtVerify(token, secret);

    console.log("Usuário autenticado:", payload);

    // Busca registros do banco
    const registros: DevocionalRegistro[] = await prisma.devocional.findMany({
      where: { userId: payload.userId },
      select: { date: true, done: true },
    });

    // Criar array dos últimos 7 dias
    const hoje = new Date();
    const dias: { date: string; done: boolean }[] = [];

    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(hoje.getDate() - i);

      // transforma a data no formato YYYY-MM-DD
      const dateStr = d.toISOString().slice(0, 10);

      // encontra no banco
      const encontrado = registros.find((item) => item.date === dateStr);

      dias.push({
        date: dateStr,
        done: encontrado ? encontrado.done : false,
      });
    }

    return res.status(200).json({ dias });
  } catch (err) {
    console.error("ERRO EM /api/devocional/status:", err);
    return res.status(500).json({ dias: [] });
  }
}
