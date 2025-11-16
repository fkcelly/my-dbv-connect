// pages/api/auth/register.ts
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios." });
  }

  // Verifica se já existe
  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    return res.status(400).json({ message: "Email já cadastrado." });
  }

  // Criptografar senha
  const hashedPassword = await bcrypt.hash(password, 10);

  // Criar usuário
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return res.status(201).json({ message: "Usuário criado com sucesso!" });
}
