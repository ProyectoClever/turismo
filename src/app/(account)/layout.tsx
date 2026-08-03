import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AccountShell } from "@/components/account/account-shell";
import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/types";

export default async function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const headerStore = await headers();
    const pathname = headerStore.get("x-pathname") || "/perfil";
    redirect(`/login?redirect=${encodeURIComponent(pathname)}`);
  }

  const { data } = await supabase
    .from("profiles")
    .select("id, full_name, avatar_url, created_at")
    .eq("id", user.id)
    .maybeSingle();

  const profile = data as Profile | null;
  const displayName =
    profile?.full_name?.trim() ||
    user.user_metadata?.full_name ||
    user.email?.split("@")[0] ||
    "Mi cuenta";

  return (
    <AccountShell
      displayName={displayName}
      email={user.email ?? null}
      avatarUrl={profile?.avatar_url ?? null}
    >
      {children}
    </AccountShell>
  );
}
