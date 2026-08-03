import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  Camera,
  ChevronRight,
  Heart,
  MapPin,
  Pencil,
  Phone,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import type { Booking, Profile } from "@/lib/types";
import { cn } from "@/lib/utils";

type ProfileDashboardProps = {
  profile: Profile | null;
  email: string | null;
  emailVerified: boolean;
  bookings: Booking[];
};

function formatMemberSince(iso: string | undefined) {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  const month = date.toLocaleDateString("es-ES", { month: "long" });
  const year = date.getFullYear();
  return `Miembro desde ${month.charAt(0).toUpperCase()}${month.slice(1)} ${year}`;
}

function formatBookingDate(iso: string) {
  const date = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function statusLabel(status: Booking["status"]) {
  if (status === "confirmed") return "Confirmada";
  if (status === "pending") return "Pendiente";
  return "Cancelada";
}

function statusClass(status: Booking["status"]) {
  if (status === "confirmed") return "bg-[#e8f8ef] text-[#127a45]";
  if (status === "pending") return "bg-[#e8f1ff] text-[#2656c8]";
  return "bg-[#f4f4f5] text-[#667085]";
}

function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-[#e8edf0] bg-white p-5 shadow-[0_8px_24px_rgba(15,35,60,0.06)] md:p-6",
        className
      )}
    >
      {children}
    </section>
  );
}

export function ProfileDashboard({
  profile,
  email,
  emailVerified,
  bookings,
}: ProfileDashboardProps) {
  const name = profile?.full_name?.trim() || email?.split("@")[0] || "Viajero";
  const memberSince = formatMemberSince(profile?.created_at);
  const upcoming = bookings.slice(0, 2);

  return (
    <div className="space-y-5 md:space-y-6">
      <Card>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative size-[88px] shrink-0">
              <div className="relative size-full overflow-hidden rounded-full bg-[#e6f7f9]">
                {profile?.avatar_url ? (
                  <Image
                    src={profile.avatar_url}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="88px"
                  />
                ) : (
                  <UserRound className="absolute inset-0 m-auto size-10 text-[#0799a6]" />
                )}
              </div>
              <span className="absolute right-0 bottom-0 flex size-8 items-center justify-center rounded-full border-2 border-white bg-[#10a7b5] text-white">
                <Camera className="size-3.5" />
              </span>
            </div>

            <div>
              <h1 className="m-0 text-[28px] font-extrabold tracking-[-0.6px] text-[#0b1f3a]">
                {name}
              </h1>
              {email && (
                <p className="mt-1 text-sm text-[#667085]">{email}</p>
              )}
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#5b657a]">
                {memberSince && (
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="size-4 text-[#98a2b3]" />
                    {memberSince}
                  </span>
                )}
                {emailVerified && (
                  <span className="inline-flex items-center gap-1.5 text-[#0799a6]">
                    <ShieldCheck className="size-4" />
                    Cuenta verificada
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            type="button"
            className="inline-flex h-11 items-center justify-center gap-2 self-start rounded-xl border-2 border-[#10a7b5] px-4 text-sm font-semibold text-[#0799a6] transition-colors hover:bg-[#e6f7f9]"
          >
            <Pencil className="size-4" />
            Editar perfil
          </button>
        </div>
      </Card>

      <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6">
        <div className="space-y-5 md:space-y-6">
          <Card>
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="m-0 text-lg font-extrabold text-[#0b1f3a]">
                Próximas reservas
              </h2>
              <Link
                href="/mis-reservas"
                className="text-sm font-semibold text-[#0799a6] no-underline hover:underline"
              >
                Ver todas mis reservas
              </Link>
            </div>

            {upcoming.length === 0 ? (
              <p className="text-sm text-[#667085]">
                No tienes reservas próximas. Explora los{" "}
                <Link href="/tours" className="font-semibold text-[#0799a6]">
                  tours
                </Link>
                .
              </p>
            ) : (
              <ul className="m-0 flex list-none flex-col gap-3 p-0">
                {upcoming.map((booking) => (
                  <li key={booking.id}>
                    <Link
                      href="/mis-reservas"
                      className="flex items-center gap-3 rounded-xl border border-[#eef2f5] p-3 no-underline transition-colors hover:bg-[#f8fafb]"
                    >
                      <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-[#e8edf0]">
                        {booking.tours?.image_url ? (
                          <Image
                            src={booking.tours.image_url}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="56px"
                          />
                        ) : (
                          <MapPin className="absolute inset-0 m-auto size-5 text-[#98a2b3]" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold text-[#0b1f3a]">
                          {booking.tours?.title ?? "Tour"}
                        </p>
                        <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#667085]">
                          <span className="inline-flex items-center gap-1">
                            <CalendarDays className="size-3.5" />
                            {formatBookingDate(booking.booking_date)}
                          </span>
                          <span>
                            {booking.guests}{" "}
                            {booking.guests === 1 ? "persona" : "personas"}
                          </span>
                        </p>
                      </div>
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-1 text-xs font-semibold",
                          statusClass(booking.status)
                        )}
                      >
                        {statusLabel(booking.status)}
                      </span>
                      <ChevronRight className="size-4 shrink-0 text-[#98a2b3]" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card>
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="m-0 text-lg font-extrabold text-[#0b1f3a]">
                Favoritos
              </h2>
              <Link
                href="/favoritos"
                className="text-sm font-semibold text-[#0799a6] no-underline hover:underline"
              >
                Ver todos
              </Link>
            </div>
            <div className="flex min-h-[120px] flex-col items-center justify-center rounded-xl border border-dashed border-[#dce3e8] bg-[#fafbfc] px-4 py-8 text-center">
              <Heart className="mb-2 size-6 text-[#98a2b3]" />
              <p className="m-0 text-sm font-medium text-[#475467]">
                Sin favoritos todavía
              </p>
              <p className="mt-1 text-xs text-[#98a2b3]">
                Guarda destinos y tours para verlos aquí.
              </p>
            </div>
          </Card>
        </div>

        <div className="space-y-5 md:space-y-6">
          <Card>
            <h2 className="m-0 mb-4 text-lg font-extrabold text-[#0b1f3a]">
              Información personal
            </h2>
            <ul className="m-0 flex list-none flex-col gap-4 p-0">
              <li className="flex items-start gap-3">
                <UserRound className="mt-0.5 size-4 shrink-0 text-[#98a2b3]" />
                <div>
                  <p className="m-0 text-xs font-medium text-[#98a2b3]">
                    Nombre completo
                  </p>
                  <p className="m-0 mt-0.5 text-sm font-semibold text-[#0b1f3a]">
                    {profile?.full_name?.trim() || "—"}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-[#98a2b3]" />
                <div>
                  <p className="m-0 text-xs font-medium text-[#98a2b3]">
                    Correo electrónico
                  </p>
                  <p className="m-0 mt-0.5 text-sm font-semibold text-[#0b1f3a]">
                    {email || "—"}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-[#98a2b3]" />
                <div>
                  <p className="m-0 text-xs font-medium text-[#98a2b3]">
                    Teléfono
                  </p>
                  <p className="m-0 mt-0.5 text-sm font-semibold text-[#0b1f3a]">
                    —
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CalendarDays className="mt-0.5 size-4 shrink-0 text-[#98a2b3]" />
                <div>
                  <p className="m-0 text-xs font-medium text-[#98a2b3]">
                    Fecha de nacimiento
                  </p>
                  <p className="m-0 mt-0.5 text-sm font-semibold text-[#0b1f3a]">
                    —
                  </p>
                </div>
              </li>
            </ul>
            <button
              type="button"
              className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#0799a6]"
            >
              Editar información
              <ChevronRight className="size-4" />
            </button>
          </Card>

          <Card>
            <h2 className="m-0 mb-4 text-lg font-extrabold text-[#0b1f3a]">
              Seguridad de la cuenta
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="m-0 text-sm font-semibold text-[#0b1f3a]">
                    Contraseña
                  </p>
                  <p className="m-0 mt-0.5 tracking-widest text-[#667085]">
                    ••••••••••••
                  </p>
                </div>
                <button
                  type="button"
                  className="text-sm font-semibold text-[#0799a6]"
                >
                  Cambiar
                </button>
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-[#eef2f5] pt-4">
                <div>
                  <p className="m-0 text-sm font-semibold text-[#0b1f3a]">
                    Verificación en dos pasos
                  </p>
                  <p className="m-0 mt-0.5 text-sm text-[#667085]">
                    Desactivado
                  </p>
                </div>
                <button
                  type="button"
                  className="text-sm font-semibold text-[#0799a6]"
                >
                  Activar
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
