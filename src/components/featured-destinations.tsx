import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Headphones,
  ShieldCheck,
  Star,
} from "lucide-react";

const destinations = [
  {
    name: "Islas del Rosario",
    description: "Playas paradisíacas y aguas cristalinas.",
    price: "$120 USD",
    badge: "Más popular",
    image:
      "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&w=900&q=80",
    href: "/destinos",
  },
  {
    name: "Chichén Itzá",
    description: "Historia, cultura y maravillas mayas.",
    price: "$95 USD",
    image:
      "https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=900&q=80",
    href: "/destinos",
  },
  {
    name: "Cartagena de Indias",
    description: "Historia, colores y encanto colonial.",
    price: "$110 USD",
    image:
      "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=900&q=80",
    href: "/destinos",
  },
] as const;

const benefits = [
  {
    title: "Reserva fácil",
    text: "Encuentra y reserva tours en pocos pasos, sin complicaciones.",
    icon: CalendarDays,
  },
  {
    title: "Pago seguro",
    text: "Tus pagos están protegidos con tecnología de encriptación.",
    icon: ShieldCheck,
  },
  {
    title: "Atención rápida",
    text: "Estamos aquí para ayudarte antes, durante y después de tu viaje.",
    icon: Headphones,
  },
] as const;

export function FeaturedDestinations() {
  return (
    <section className="w-full border-t border-[#eef2f5] bg-white px-5 py-14 text-[#10213a] md:px-[5%] md:py-16 xl:px-[13.5%]">
      <div className="mb-9 flex items-end justify-between gap-4">
        <div>
          <p className="mb-1.5 text-sm font-semibold tracking-wide text-[#0799a6]">
            Explora
          </p>
          <h2 className="m-0 text-[clamp(24px,3vw,30px)] font-bold tracking-tight">
            Destinos destacados
          </h2>
        </div>
        <Link
          href="/destinos"
          className="inline-flex items-center gap-1.5 pb-1 text-sm font-semibold text-[#0799a6] transition-colors hover:text-[#068090]"
        >
          Ver todos
          <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-7">
        {destinations.map((destination) => (
          <article
            key={destination.name}
            className="group overflow-hidden rounded-2xl border border-[#e8edf0] bg-white shadow-[0_6px_20px_rgba(15,35,60,0.05)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(15,35,60,0.1)]"
          >
            <div className="relative h-[200px] overflow-hidden">
              <Image
                src={destination.image}
                alt={destination.name}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              {"badge" in destination && destination.badge ? (
                <span className="absolute top-3.5 left-3.5 inline-flex items-center gap-1 rounded-lg bg-[#0799a6] px-3 py-1.5 text-xs font-semibold text-white shadow-sm">
                  <Star className="size-3 fill-white" />
                  {destination.badge}
                </span>
              ) : null}
            </div>

            <div className="p-5">
              <h3 className="m-0 mb-1.5 text-lg font-bold tracking-tight">
                {destination.name}
              </h3>
              <p className="m-0 text-sm leading-relaxed text-[#667085]">
                {destination.description}
              </p>

              <div className="mt-5 flex items-end justify-between gap-3">
                <div>
                  <span className="block text-xs text-[#808896]">Desde</span>
                  <strong className="text-lg font-bold text-[#0799a6]">
                    {destination.price}
                  </strong>
                </div>

                <Link
                  href={destination.href}
                  className="inline-flex h-10 items-center justify-center rounded-lg border border-[#0799a6] px-4 text-sm font-semibold text-[#0799a6] transition-colors hover:bg-[#0799a6] hover:text-white"
                >
                  Ver más
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 rounded-2xl border border-[#e8edf0] bg-[#f8fbfc] md:grid-cols-3">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <article
              key={benefit.title}
              className={`flex items-start gap-4 px-6 py-6 md:px-7 ${
                index > 0
                  ? "border-t border-[#e4e9ee] md:border-t-0 md:border-l"
                  : ""
              }`}
            >
              <div className="grid size-14 shrink-0 place-items-center rounded-full bg-[#eef8f8] text-[#0799a6]">
                <Icon className="size-6" strokeWidth={1.75} />
              </div>
              <div>
                <h3 className="m-0 mb-1.5 text-base font-bold">
                  {benefit.title}
                </h3>
                <p className="m-0 max-w-[260px] text-sm leading-relaxed text-[#5b657a]">
                  {benefit.text}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
