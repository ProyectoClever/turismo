"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  CalendarDays,
  Check,
  Clock3,
  Heart,
  MapPin,
  Mountain,
  Palmtree,
  Percent,
  RefreshCw,
  Search,
  Star,
  Trees,
  Users,
  Landmark,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { id: "playa", label: "Playa", icon: Palmtree },
  { id: "aventura", label: "Aventura", icon: Mountain },
  { id: "cultural", label: "Cultural", icon: Landmark },
  { id: "naturaleza", label: "Naturaleza", icon: Trees },
] as const;

const durations = ["Medio día", "1 día", "2+ días"] as const;
const ratings = ["4.5+", "4.0+"] as const;

const tours = [
  {
    title: "Tour a Guatapé",
    badge: "Popular",
    badgeClass: "bg-[#0b9cab]",
    description:
      "Descubre el colorido pueblo y sube la imponente Piedra del Peñol.",
    rating: "4.8",
    reviews: "1,245",
    duration: "10 horas",
    location: "Medellín",
    group: "Grupo compartido",
    includes: ["Guía", "Transporte", "Entrada"],
    price: "$95 USD",
    image:
      "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Chichén Itzá Full Day",
    badge: "Top",
    badgeClass: "bg-[#7c3aed]",
    description:
      "Explora las majestuosas ruinas mayas y disfruta de un cenote.",
    rating: "4.9",
    reviews: "2,031",
    duration: "12 horas",
    location: "Yucatán",
    group: "Grupo compartido",
    includes: ["Guía", "Transporte", "Entrada a cenote"],
    price: "$110 USD",
    image:
      "https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Cartagena Colonial",
    badge: "Oferta",
    badgeClass: "bg-[#f6534d]",
    description:
      "Recorre el centro histórico amurallado y disfruta de sabores locales.",
    rating: "4.7",
    reviews: "987",
    duration: "6 horas",
    location: "Cartagena",
    group: "Grupo pequeño",
    includes: ["Guía", "Agua", "Degustación"],
    price: "$75 USD",
    image:
      "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Valle de Cocora",
    badge: "Nuevo",
    badgeClass: "bg-[#16a34a]",
    description:
      "Conecta con la naturaleza entre montañas y palmas de cera.",
    rating: "4.8",
    reviews: "654",
    duration: "9 horas",
    location: "Salento",
    group: "Grupo compartido",
    includes: ["Guía", "Transporte", "Seguro"],
    price: "$85 USD",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
  },
] as const;

const quickFilters = [
  { id: "todos", label: "Todos", icon: null },
  { id: "populares", label: "Más populares", icon: TrendingUp },
  { id: "descuento", label: "Con descuento", icon: Percent },
  { id: "flexible", label: "Cancelación flexible", icon: RefreshCw },
] as const;

export function ToursContent() {
  const [activeQuick, setActiveQuick] = useState("todos");
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [activeDurations, setActiveDurations] = useState<string[]>([]);
  const [activeRatings, setActiveRatings] = useState<string[]>([]);
  const [availableOnly, setAvailableOnly] = useState(true);

  function toggleCategory(id: string) {
    setActiveCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  }

  function toggleDuration(item: string) {
    setActiveDurations((prev) =>
      prev.includes(item) ? prev.filter((d) => d !== item) : [...prev, item]
    );
  }

  function toggleRating(item: string) {
    setActiveRatings((prev) =>
      prev.includes(item) ? prev.filter((r) => r !== item) : [...prev, item]
    );
  }

  return (
    <div className="w-full bg-white px-5 pt-10 pb-12 text-[#0b1f3a] md:px-[5%] md:pt-12 xl:px-[13.5%]">
      <header className="mb-8">
        <p className="mb-2 text-sm font-semibold tracking-wide text-[#0b9cab]">
          Catálogo
        </p>
        <h1 className="m-0 mb-2 text-[clamp(28px,3.5vw,36px)] font-bold tracking-tight">
          Encuentra el tour perfecto
        </h1>
        <p className="m-0 max-w-xl text-[15px] leading-relaxed text-[#667085]">
          Compara experiencias, filtra por tus preferencias y reserva en
          pocos pasos.
        </p>
      </header>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[280px_1fr]">
        <aside className="h-fit rounded-2xl border border-[#e4e9ee] bg-white p-5 shadow-[0_4px_16px_rgba(16,24,40,0.03)] xl:sticky xl:top-6">
          <h2 className="m-0 mb-5 text-lg font-bold">Filtros</h2>

          <div className="mb-4">
            <label
              htmlFor="tour-destination"
              className="mb-2 block text-sm font-semibold"
            >
              Destino
            </label>
            <div className="flex h-10 items-center gap-2.5 rounded-lg border border-[#e1e7ec] bg-[#fafbfc] px-3 text-[#667085] transition-colors focus-within:border-[#0b9cab] focus-within:bg-white">
              <Search className="size-4 shrink-0" />
              <input
                id="tour-destination"
                placeholder="¿A dónde quieres ir?"
                className="w-full border-0 bg-transparent text-sm text-[#344054] outline-none"
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="tour-date" className="mb-2 block text-sm font-semibold">
              Fecha
            </label>
            <div className="flex h-10 items-center gap-2.5 rounded-lg border border-[#e1e7ec] bg-[#fafbfc] px-3 text-[#667085] transition-colors focus-within:border-[#0b9cab] focus-within:bg-white">
              <CalendarDays className="size-4 shrink-0" />
              <input
                id="tour-date"
                type="date"
                className="w-full border-0 bg-transparent text-sm text-[#344054] outline-none"
              />
            </div>
          </div>

          <div className="mb-5">
            <span className="mb-2 block text-sm font-semibold">Categoría</span>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const active = activeCategories.includes(cat.id);
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => toggleCategory(cat.id)}
                    className={cn(
                      "inline-flex h-9 items-center justify-center gap-1.5 rounded-full border text-xs font-medium transition-colors",
                      active
                        ? "border-[#0b9cab] bg-[#0b9cab] text-white"
                        : "border-[#e1e7ec] bg-white text-[#344054] hover:border-[#0b9cab]/50"
                    )}
                  >
                    <Icon className="size-3.5" />
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mb-5">
            <span className="mb-2 block text-sm font-semibold">Precio</span>
            <div className="mb-2 flex justify-between text-xs text-[#667085]">
              <span>$50</span>
              <span>$250</span>
            </div>
            <div className="relative h-5">
              <div className="absolute top-2 right-0 left-0 h-1 rounded-full bg-[#e1e7ec]" />
              <div className="absolute top-2 right-[14%] left-[20%] h-1 rounded-full bg-[#0b9cab]" />
              <span className="absolute top-0.5 left-[17%] size-3.5 rounded-full border-2 border-white bg-[#0b9cab] shadow" />
              <span className="absolute top-0.5 right-[11%] size-3.5 rounded-full border-2 border-white bg-[#0b9cab] shadow" />
            </div>
          </div>

          <div className="mb-5">
            <span className="mb-2.5 block text-sm font-semibold">Duración</span>
            <div className="space-y-2">
              {durations.map((item) => {
                const active = activeDurations.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleDuration(item)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left text-sm transition-all",
                      active
                        ? "border-[#0b9cab] bg-[#eef8f8] text-[#0b1f3a] shadow-[0_0_0_1px_rgba(11,156,171,0.15)]"
                        : "border-[#e8edf0] bg-white text-[#344054] hover:border-[#0b9cab]/45 hover:bg-[#f8fbfc]"
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-[18px] shrink-0 place-items-center rounded-md border transition-colors",
                        active
                          ? "border-[#0b9cab] bg-[#0b9cab] text-white"
                          : "border-[#c5ced8] bg-white"
                      )}
                    >
                      {active ? <Check className="size-3" strokeWidth={3} /> : null}
                    </span>
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mb-5">
            <span className="mb-2.5 block text-sm font-semibold">Calificación</span>
            <div className="space-y-2">
              {ratings.map((rating) => {
                const active = activeRatings.includes(rating);
                return (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => toggleRating(rating)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left text-sm transition-all",
                      active
                        ? "border-[#0b9cab] bg-[#eef8f8] text-[#0b1f3a] shadow-[0_0_0_1px_rgba(11,156,171,0.15)]"
                        : "border-[#e8edf0] bg-white text-[#344054] hover:border-[#0b9cab]/45 hover:bg-[#f8fbfc]"
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-[18px] shrink-0 place-items-center rounded-md border transition-colors",
                        active
                          ? "border-[#0b9cab] bg-[#0b9cab] text-white"
                          : "border-[#c5ced8] bg-white"
                      )}
                    >
                      {active ? <Check className="size-3" strokeWidth={3} /> : null}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Star className="size-3.5 fill-[#ffb000] text-[#ffb000]" />
                      {rating}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mb-5 flex items-center justify-between gap-3">
            <span className="text-sm font-semibold">Solo disponibles</span>
            <button
              type="button"
              aria-pressed={availableOnly}
              onClick={() => setAvailableOnly((v) => !v)}
              className={cn(
                "relative h-6 w-11 rounded-full transition-colors",
                availableOnly ? "bg-[#0b9cab]" : "bg-[#d9e0e5]"
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 size-5 rounded-full bg-white shadow transition-all",
                  availableOnly ? "right-0.5" : "left-0.5"
                )}
              />
            </button>
          </div>

          <button
            type="button"
            className="h-10 w-full rounded-lg bg-[#0b9cab] text-sm font-semibold text-white transition-colors hover:bg-[#087f8c]"
          >
            Aplicar filtros
          </button>
          <button
            type="button"
            className="mt-2 h-10 w-full rounded-lg border border-[#0b9cab] bg-white text-sm font-semibold text-[#0b9cab] transition-colors hover:bg-[#eef8f8]"
          >
            Limpiar
          </button>
        </aside>

        <section>
          <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-[#e4e9ee] bg-white p-4 shadow-[0_4px_16px_rgba(16,24,40,0.03)] sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm font-semibold">48 resultados</div>

            <div className="flex flex-wrap items-center gap-2">
              {quickFilters.map((filter) => {
                const Icon = filter.icon;
                return (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setActiveQuick(filter.id)}
                    className={cn(
                      "inline-flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-xs font-medium transition-colors",
                      activeQuick === filter.id
                        ? "border-[#0b9cab] bg-[#0b9cab] text-white"
                        : "border-[#e1e7ec] bg-white text-[#344054] hover:border-[#0b9cab]/40"
                    )}
                  >
                    {Icon ? <Icon className="size-3.5" /> : null}
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            {tours.map((tour) => (
              <article
                key={tour.title}
                className="group grid grid-cols-1 overflow-hidden rounded-2xl border border-[#e4e9ee] bg-white shadow-[0_4px_16px_rgba(16,24,40,0.04)] transition duration-300 hover:shadow-[0_10px_28px_rgba(16,24,40,0.08)] lg:grid-cols-[260px_1fr_230px]"
              >
                <div className="relative h-[200px] overflow-hidden lg:h-auto lg:min-h-[176px]">
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 260px"
                  />
                </div>

                <div className="flex min-w-0 flex-col justify-center gap-2.5 p-5">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold text-white",
                        tour.badgeClass
                      )}
                    >
                      {tour.badge === "Nuevo" ? (
                        <Sparkles className="size-3" />
                      ) : (
                        <Star className="size-3 fill-white" />
                      )}
                      {tour.badge}
                    </span>
                    <h3 className="m-0 text-xl font-bold tracking-tight">
                      {tour.title}
                    </h3>
                  </div>

                  <p className="m-0 text-sm leading-relaxed text-[#667085]">
                    {tour.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-[#4d5868]">
                    <span className="inline-flex items-center gap-1.5">
                      <Star className="size-3.5 fill-[#ffb000] text-[#ffb000]" />
                      <strong className="text-[#0b1f3a]">{tour.rating}</strong>
                      <span className="text-[#808896]">({tour.reviews})</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 className="size-3.5" />
                      {tour.duration}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="size-3.5" />
                      {tour.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Users className="size-3.5" />
                      {tour.group}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-[13px]">
                    <span className="font-semibold text-[#0b1f3a]">Incluye:</span>
                    {tour.includes.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-[#f0f4f7] px-2.5 py-0.5 text-[#4d5868]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-center border-t border-[#eef1f4] p-5 lg:border-t-0 lg:border-l">
                  <button
                    type="button"
                    aria-label="Guardar favorito"
                    className="mb-2 self-start rounded-full p-1.5 text-[#8b93a1] transition-colors hover:bg-[#f0f4f7] hover:text-[#f6534d]"
                  >
                    <Heart className="size-5" />
                  </button>
                  <div className="text-xs text-[#808896]">Desde</div>
                  <div className="mb-4 text-[24px] font-bold tracking-tight text-[#0b9cab]">
                    {tour.price}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/tours"
                      className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-lg border border-[#0b9cab] bg-white px-2 text-xs font-semibold text-[#0b9cab] transition-colors hover:bg-[#eef8f8]"
                    >
                      Ver detalles
                    </Link>
                    <Link
                      href="/login"
                      className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-lg bg-[#f6534d] px-2 text-xs font-semibold text-white transition-colors hover:bg-[#e04540]"
                    >
                      Reservar
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {["←", "1", "2", "3", "4", "→"].map((page) => (
              <button
                key={page}
                type="button"
                className={cn(
                  "h-9 w-9 rounded-lg border text-sm font-semibold transition-colors",
                  page === "1"
                    ? "border-[#0b9cab] bg-[#0b9cab] text-white"
                    : "border-[#e1e7ec] bg-white text-[#0b1f3a] hover:border-[#0b9cab]/50"
                )}
              >
                {page}
              </button>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}
