import { updateSession } from "@/lib/supabase/middleware";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Mantiene sesión sincronizada
  const response = await updateSession(request);

  // Define tus rutas protegidas
  const protectedRoutes = [
    "/protected",
    // "/dashboard",
    // "/pacientes",
    // "/configuracion",
  ];
  const isProtected = protectedRoutes.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  // Comprueba si hay sesión activa
  const hasSession = request.cookies.get("sb-access-token");

  if (isProtected && !hasSession) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
