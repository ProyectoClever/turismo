"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  CalendarDays,
  CreditCard,
  Heart,
  LogOut,
  Settings,
  UserRound,
} from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { signOut } from "@/app/actions/auth";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/perfil", label: "Mi perfil", icon: UserRound },
  { href: "/mis-reservas", label: "Mis reservas", icon: CalendarDays },
  { href: "/favoritos", label: "Favoritos", icon: Heart },
  { href: "/metodos-pago", label: "Métodos de pago", icon: CreditCard },
  { href: "/notificaciones", label: "Notificaciones", icon: Bell },
  { href: "/configuracion", label: "Configuración", icon: Settings },
] as const;

export function AccountSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-full flex-col border-r border-[#e8edf0] bg-[#f7f9fb] px-4 py-6 md:w-[260px] md:shrink-0 md:px-5">
      <BrandLogo size="sm" className="mb-8 px-2" />

      <nav className="flex flex-1 flex-col gap-1" aria-label="Cuenta">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/perfil"
              ? pathname === "/perfil"
              : pathname === href || pathname.startsWith(`${href}/`);

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "inline-flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-semibold no-underline transition-colors",
                active
                  ? "bg-[#e6f7f9] text-[#0799a6]"
                  : "text-[#475467] hover:bg-white hover:text-[#0b1f3a]"
              )}
            >
              <Icon className="size-[18px] shrink-0 stroke-[1.8]" />
              {label}
            </Link>
          );
        })}
      </nav>

      <form action={signOut} className="mt-6 border-t border-[#e8edf0] pt-4">
        <button
          type="submit"
          className="inline-flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-semibold text-[#e11d48] transition-colors hover:bg-[#fff1f2]"
        >
          <LogOut className="size-[18px] shrink-0 stroke-[1.8]" />
          Cerrar sesión
        </button>
      </form>
    </aside>
  );
}
