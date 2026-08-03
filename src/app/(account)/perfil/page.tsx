import { ProfileDashboard } from "@/components/account/profile-dashboard";
import { createClient } from "@/lib/supabase/server";
import type { Booking, Profile } from "@/lib/types";

export const metadata = {
  title: "Mi perfil | TurismoGo",
};

export default async function PerfilPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const [{ data: profileData }, { data: bookingsData }] = await Promise.all([
    supabase
      .from("profiles")
      .select("id, full_name, avatar_url, created_at")
      .eq("id", user.id)
      .maybeSingle(),
    supabase
      .from("bookings")
      .select("*, tours(title, price, duration_days, image_url)")
      .in("status", ["pending", "confirmed"])
      .gte("booking_date", new Date().toISOString().slice(0, 10))
      .order("booking_date", { ascending: true })
      .limit(2),
  ]);

  return (
    <ProfileDashboard
      profile={(profileData as Profile | null) ?? null}
      email={user.email ?? null}
      emailVerified={Boolean(user.email_confirmed_at)}
      bookings={(bookingsData as Booking[]) ?? []}
    />
  );
}
