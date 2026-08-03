"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserRound } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/tours", label: "Tours" },
  { href: "/destinos", label: "Destinos" },
  { href: "/mis-reservas", label: "Mis reservas" },
] as const;

type NavbarProps = {
  userEmail?: string | null;
};

export function Navbar({ userEmail }: NavbarProps) {
  const pathname = usePathname();

  return (
    <header className="grid h-[72px] w-full grid-cols-[1fr_auto_1fr] items-center border-b border-[#e8edf0] bg-white px-5 shadow-[0_4px_12px_rgba(23,32,51,0.06)] md:px-[70px] xl:px-[184px]">
      <BrandLogo size="md" className="justify-self-start" />

      <nav
        className="flex h-full items-center gap-10 lg:gap-[65px]"
        aria-label="Navegación principal"
      >
        {links.map((link) => {
          const active =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative inline-flex h-full items-center whitespace-nowrap text-[15px] font-semibold text-[#172033] no-underline transition-colors hover:text-[#27C0CF]",
                active &&
                  "text-[#27C0CF] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:rounded-full after:bg-[#27C0CF]"
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <Link
        href={userEmail ? "/perfil" : "/login"}
        className={cn(
          buttonVariants({ variant: "outline" }),
          "h-[38px] justify-self-end gap-[9px] rounded-[7px] border border-[#22a8b5] bg-white px-[17px] text-[15px] font-semibold text-[#0798a8] hover:bg-[#0798a8]/10 hover:text-[#0798a8]"
        )}
      >
        <UserRound className="size-[18px]" />
        <span className={userEmail ? "max-w-[140px] truncate" : undefined}>
          {userEmail ?? "Iniciar sesión"}
        </span>
      </Link>
    </header>
  );
}
