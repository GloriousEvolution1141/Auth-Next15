import { updateSession } from "@/lib/supabase/middleware";

export const middleware = updateSession;

export const config = {
  matcher: [
    // Aplica middleware a todas las rutas excepto los recursos estáticos y autenticación
    "/((?!_next/static|_next/image|favicon.ico|auth|login|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
