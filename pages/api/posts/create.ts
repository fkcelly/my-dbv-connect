import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getCookie } from "cookies-next";
import { jwtVerify } from "jose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const token = getCookie("token", { req, res }) as string | undefined;
    if (!token) return res.status(401).json({ message: "Não autenticado." });

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload }: any = await jwtVerify(token, secret);

    const { content } = req.body;

    const post = await prisma.post.create({
      data: {
        content,
        authorId: payload.userId,
      },
    });

    return res.status(201).json({ post });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ message: "Erro ao criar post." });
  }
}
