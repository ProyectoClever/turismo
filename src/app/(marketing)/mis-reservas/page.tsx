import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { ReservationsGuest } from "@/components/reservations-guest";
import type { Booking } from "@/lib/types";

export default async function MisReservasPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <ReservationsGuest />;
  }

  const { data, error } = await supabase
    .from("bookings")
    .select("*, tours(title, price, duration_days)")
    .order("created_at", { ascending: false });

  const bookings = (data as Booking[]) ?? [];

  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-12 md:px-[5%] xl:px-[13.5%]">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-[#172033]">Mis reservas</h1>
          <p className="text-[#5b657a]">
            Hola{user.email ? `, ${user.email}` : ""}. Aquí están tus viajes.
          </p>
        </div>
        <form action={signOut}>
          <Button
            type="submit"
            variant="outline"
            className="h-10 rounded-[7px] border-[#22a8b5] text-[#0798a8] hover:bg-[#0798a8]/10 hover:text-[#0798a8]"
          >
            Cerrar sesión
          </Button>
        </form>
      </header>

      {error && (
        <p className="rounded-[7px] border border-[#e8edf0] bg-[#f4f8f9] px-4 py-3 text-sm text-[#5b657a]">
          {error.message}. Asegúrate de haber ejecutado{" "}
          <code className="rounded bg-white px-1.5 py-0.5">
            supabase/schema.sql
          </code>
          .
        </p>
      )}

      {!error && bookings.length === 0 && (
        <p className="text-[#5b657a]">
          Todavía no tienes reservas. Explora los{" "}
          <a href="/tours" className="font-semibold text-[#0798a8]">
            tours
          </a>{" "}
          disponibles.
        </p>
      )}

      <ul className="mt-6 space-y-4">
        {bookings.map((booking) => (
          <li
            key={booking.id}
            className="flex flex-wrap items-center justify-between gap-3 border-t border-[#e8edf0] py-4"
          >
            <div>
              <h2 className="text-lg font-semibold text-[#172033]">
                {booking.tours?.title ?? "Tour"}
              </h2>
              <p className="text-sm text-[#5b657a]">
                Fecha: {booking.booking_date} · {booking.guests} huésped(es)
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold capitalize text-[#0798a8]">
                {booking.status}
              </p>
              <p className="text-sm text-[#172033]">
                ${Number(booking.total_price).toFixed(2)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
