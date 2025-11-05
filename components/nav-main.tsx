"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, type LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar"; // <-- importante

interface NavItem {
  title: string;
  url?: string;
  icon?: LucideIcon;
  items?: NavItem[];
}

interface NavMainProps {
  items: NavItem[];
  basePath?: string;
}

const STORAGE_KEY = "sidebar-open-v5";

export function NavMain({ items, basePath = "" }: NavMainProps) {
  const pathname = usePathname();
  const { state } = useSidebar(); // "expanded" o "collapsed"
  const isCollapsed = state === "collapsed";

  const [openSection, setOpenSection] = React.useState<string | null>(null);
  const initializedRef = React.useRef(false);

  // Inicializa desde sessionStorage
  React.useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) setOpenSection(saved);
    } catch {
      // ignore
    } finally {
      initializedRef.current = true;
    }
  }, []);

  // Guarda en sessionStorage
  React.useEffect(() => {
    if (openSection) sessionStorage.setItem(STORAGE_KEY, openSection);
    else sessionStorage.removeItem(STORAGE_KEY);
  }, [openSection]);

  // Autoabrir sección activa
  React.useEffect(() => {
    if (!initializedRef.current) return;
    const active = items.find((section) =>
      section.items?.some((it) => {
        const full = basePath + (it.url || "");
        return pathname === full || pathname.startsWith(full + "/");
      })
    );
    if (active && active.title !== openSection) {
      setOpenSection(active.title);
    }
  }, [pathname, items, basePath, openSection]);

  // 🔒 Cierra todo automáticamente cuando el sidebar se colapsa
  React.useEffect(() => {
    if (isCollapsed) setOpenSection(null);
  }, [isCollapsed]);

  const toggleSection = (title: string) => {
    if (isCollapsed) return; // no permitir clics cuando está cerrado
    setOpenSection((prev) => (prev === title ? null : title));
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menú principal</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((section) => {
          const Icon = section.icon;
          const isOpen = openSection === section.title;
          const hasChildren = !!(section.items && section.items.length > 0);

          return (
            <SidebarMenuItem key={section.title}>
              <SidebarMenuButton
                onClick={() => hasChildren && toggleSection(section.title)}
                className={cn(
                  "flex w-full items-center justify-between transition-colors",
                  pathname === section.url &&
                    "bg-accent text-accent-foreground",
                  "hover:bg-muted hover:text-foreground",
                  isCollapsed && "cursor-default"
                )}
              >
                <div className="flex items-center gap-2">
                  {Icon && <Icon className="h-4 w-4" />}
                  <span>{section.title}</span>
                </div>

                {hasChildren && (
                  <ChevronRight
                    className={cn(
                      "h-4 w-4 ml-auto transition-transform duration-200",
                      isOpen && "rotate-90"
                    )}
                  />
                )}
              </SidebarMenuButton>

              {/* Contenido colapsable con animación */}
              <div
                className={cn(
                  "ml-5 mt-1 space-y-1 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                  isOpen && !isCollapsed
                    ? "max-h-[500px] opacity-100"
                    : "max-h-0 opacity-0 overflow-hidden"
                )}
              >
                {!isCollapsed &&
                  section.items?.map((item) => {
                    const href = item.url && item.url !== "#" ? item.url : "/";
                    const active =
                      pathname === href || pathname.startsWith(href + "/");

                    return (
                      <Link
                        key={item.title}
                        href={href}
                        className={cn(
                          "block rounded-md px-3 py-1.5 text-sm transition-colors",
                          active
                            ? "bg-accent text-accent-foreground"
                            : "hover:bg-muted hover:text-foreground"
                        )}
                      >
                        {item.title}
                      </Link>
                    );
                  })}
              </div>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
