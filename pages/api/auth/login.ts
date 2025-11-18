// pages/api/auth/login.ts
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { setCookie } from "cookies-next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Preencha todos os campos." });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res.status(400).json({ message: "Email não encontrado." });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(400).json({ message: "Senha incorreta." });
  }

  // Gerar token JWT seguro
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({ userId: user.id })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .setIssuedAt()
    .sign(secret);

  // Salvar cookie
  setCookie("token", token, {
    req,
    res,
    httpOnly: true,
    secure: false, // coloque true quando publicar
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 dias
  });

  return res.status(200).json({ message: "Login realizado", name: user.name });
}
