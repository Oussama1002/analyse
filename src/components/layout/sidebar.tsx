"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Target,
  Kanban,
  Radio,
  Contact,
  Share2,
  DollarSign,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { fr } from "@/lib/i18n/fr";

const navItems = [
  { href: "/", label: fr.nav.dashboard, icon: LayoutDashboard },
  { href: "/clients", label: fr.nav.clients, icon: Users },
  { href: "/leads", label: fr.nav.leads, icon: Target },
  { href: "/crm", label: fr.nav.crm, icon: Kanban },
  { href: "/acquisition", label: fr.nav.acquisition, icon: Radio },
  { href: "/linkedin", label: fr.nav.linkedin, icon: Contact },
  { href: "/social", label: fr.nav.social, icon: Share2 },
  { href: "/finance", label: fr.nav.finance, icon: DollarSign },
  { href: "/strategy", label: fr.nav.strategy, icon: FileText },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "flex flex-col border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 transition-all duration-300",
        collapsed ? "w-[68px]" : "w-64"
      )}
    >
      <div className="flex h-16 items-center border-b border-zinc-200 px-4 dark:border-zinc-800">
        {!collapsed && (
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-sm">
              S
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold">Softnovation</p>
              <p className="truncate text-[10px] text-zinc-500">{fr.nav.marketIntelligence}</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-sm">
            S
          </div>
        )}
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300"
                  : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900",
                collapsed && "justify-center px-2"
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-zinc-200 p-3 dark:border-zinc-800">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center justify-center rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
          aria-label={collapsed ? fr.nav.expandSidebar : fr.nav.collapseSidebar}
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>
    </aside>
  );
}
