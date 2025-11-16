import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  // Rotas que exigem login
  const protectedRoutes = ["/perfil"];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Se a rota não exigir login → libera
  if (!isProtected) {
    return NextResponse.next();
  }

  // Se não tiver token → redireciona
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // Valida token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
