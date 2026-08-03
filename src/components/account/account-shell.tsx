import Image from "next/image";
import Link from "next/link";
import { ChevronDown, UserRound } from "lucide-react";
import { AccountSidebar } from "@/components/account/account-sidebar";

type AccountShellProps = {
  children: React.ReactNode;
  displayName: string;
  email: string | null;
  avatarUrl: string | null;
};

export function AccountShell({
  children,
  displayName,
  email,
  avatarUrl,
}: AccountShellProps) {
  return (
    <div className="flex min-h-full flex-1 bg-[#f3f5f8]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col md:flex-row">
        <AccountSidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-16 items-center justify-end border-b border-[#e8edf0] bg-white px-5 md:px-8">
            <Link
              href="/perfil"
              className="inline-flex items-center gap-2.5 rounded-full py-1 pr-2 pl-1 no-underline transition-colors hover:bg-[#f4f8f9]"
            >
              <span className="relative flex size-9 overflow-hidden rounded-full bg-[#e6f7f9]">
                {avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="36px"
                  />
                ) : (
                  <UserRound className="m-auto size-4 text-[#0799a6]" />
                )}
              </span>
              <span className="hidden max-w-[180px] truncate text-sm font-semibold text-[#0b1f3a] sm:inline">
                {displayName || email || "Mi cuenta"}
              </span>
              <ChevronDown className="size-4 text-[#667085]" />
            </Link>
          </header>

          <main className="flex-1 px-5 py-6 md:px-8 md:py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
