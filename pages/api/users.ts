import prisma from '@/lib/prisma.ts';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { name, email, password } = await request.json();
  const user = await prisma.user.create({
    data: { name, email, password }
  });
  return NextResponse.json(user);
}