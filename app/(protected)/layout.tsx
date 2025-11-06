import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { hasEnvVars } from "@/lib/utils";

import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { DynamicBreadcrumb } from "@/components/dynamic-breadcrumb";
import { AuthButton } from "@/components/auth-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import { ThemeSwitcher } from "@/components/theme-switcher";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Protección con Supabase
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <DynamicBreadcrumb />

          <div className="flex items-center gap-4 ml-auto">
            {/* {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />} */}
            <ThemeSwitcher />
          </div>
        </header>
        <main className="m-3 flex-1 overflow-auto">
          {" "}
          <div className="p-4">{children}</div>
        </main>
        <footer className="border-t border-gray-200 bg-gray-50 px-6 py-4 dark: bg-transparent">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-2">
            <span className="text-sm text-gray-500">
              © 2025 Glorious. Todos los derechos reservados.
            </span>
            {/* <div className="flex gap-4 text-sm text-gray-500">
              <a
                href="/privacy"
                className="hover:text-gray-700 transition-colors"
              >
                Privacidad
              </a>
              <a
                href="/terms"
                className="hover:text-gray-700 transition-colors"
              >
                Términos
              </a>
              <a href="/help" className="hover:text-gray-700 transition-colors">
                Ayuda
              </a>
            </div> */}
          </div>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}
