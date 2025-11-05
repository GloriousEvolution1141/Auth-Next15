"use client";

import * as React from "react";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import { ChevronRight } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar";

interface NavItem {
  title: string;
  url?: string;
  icon?: any;
  items?: NavItem[];
}

interface NavMainProps {
  items: NavItem[];
  basePath?: string;
}

// 🔹 Mapa de etiquetas amigables
const labelMap: Record<string, string> = {
  "/home": "Inicio",
};

const STORAGE_KEY = "sidebar-open-v5";

export function NavMain({ items, basePath = "" }: NavMainProps) {
  const segments = useSelectedLayoutSegments();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const [openSection, setOpenSection] = React.useState<string | null>(null);
  const initializedRef = React.useRef(false);

  React.useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) setOpenSection(saved);
    } catch {}
    initializedRef.current = true;
  }, []);

  React.useEffect(() => {
    if (openSection) sessionStorage.setItem(STORAGE_KEY, openSection);
    else sessionStorage.removeItem(STORAGE_KEY);
  }, [openSection]);

  React.useEffect(() => {
    if (!initializedRef.current) return;
    const active = items.find((section) =>
      section.items?.some((it) =>
        segments.includes(it.url?.replace(/^\//, "") || "")
      )
    );
    if (active && active.title !== openSection) setOpenSection(active.title);
  }, [segments, items, openSection]);

  React.useEffect(() => {
    if (isCollapsed) setOpenSection(null);
  }, [isCollapsed]);

  const toggleSection = (title: string) => {
    if (isCollapsed) return;
    setOpenSection((prev) => (prev === title ? null : title));
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menú principal</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((section) => {
          const isOpen = openSection === section.title;
          const hasChildren = !!(section.items && section.items.length > 0);

          return (
            <SidebarMenuItem key={section.title}>
              {hasChildren ? (
                <SidebarMenuButton
                  onClick={() => toggleSection(section.title)}
                  className={cn(
                    "flex w-full items-center justify-between transition-colors",
                    isCollapsed && "cursor-default"
                  )}
                >
                  <div className="flex items-center gap-2">
                    {section.icon && <section.icon className="h-4 w-4" />}
                    <span>{labelMap[section.url || ""] || section.title}</span>
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
              ) : (
                <SidebarMenuButton asChild>
                  <Link
                    href={section.url || "/"}
                    className={cn(
                      "flex w-full items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors",
                      segments.join("/") ===
                        (section.url || "/").replace(/^\//, "")
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {section.icon && <section.icon className="h-4 w-4" />}
                    <span>{labelMap[section.url || ""] || section.title}</span>
                  </Link>
                </SidebarMenuButton>
              )}

              {/* Contenido colapsable */}
              {hasChildren && (
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
                      const href = item.url || "/";
                      const active =
                        segments.join("/") === href.replace(/^\//, "");
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
                          {labelMap[href] || item.title}
                        </Link>
                      );
                    })}
                </div>
              )}
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
