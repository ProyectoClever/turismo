import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { createClient } from "@/lib/supabase/server";

export default async function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let userEmail: string | null = null;

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    userEmail = user?.email ?? null;
  } catch {
    // Env vars may be placeholders during first setup.
  }

  return (
    <>
      <Navbar userEmail={userEmail} />
      <main className="flex-1 pb-10 md:pb-14">{children}</main>
      <Footer />
    </>
  );
}
