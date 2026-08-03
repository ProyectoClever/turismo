"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  CheckCircle2,
  Headphones,
  MapPin,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";

export function Hero() {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [people, setPeople] = useState("2 personas");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination) params.set("q", destination);
    if (date) params.set("date", date);
    if (people) params.set("people", people);
    router.push(`/tours?${params.toString()}`);
  }

  return (
    <section
      className="relative min-h-[460px] overflow-hidden px-5 pb-10 pt-12 md:px-[5%] md:pt-14 xl:px-[13.5%]"
      style={{
        backgroundImage: `
          linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.92) 0%,
            rgba(255, 255, 255, 0.7) 34%,
            rgba(255, 255, 255, 0.12) 68%
          ),
          url("/hero-turismo.png")
        `,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative z-[2] max-w-[640px]">
        <h1 className="m-0 text-[clamp(42px,5vw,68px)] font-bold leading-[0.98] tracking-[-0.04em] text-[#071c35]">
          Encuentra tu
          <span className="mt-1 block text-[#0799a6]">próxima aventura</span>
        </h1>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-[#4d5868]">
          Explora destinos increíbles y vive experiencias únicas.
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="relative z-[3] mt-8 grid w-full grid-cols-1 items-end gap-4 rounded-2xl border border-white/60 bg-white/95 p-5 shadow-[0_16px_40px_rgba(20,49,70,0.16)] backdrop-blur-sm md:grid-cols-2 md:gap-5 md:p-6 xl:grid-cols-[1.2fr_1.1fr_1fr_210px]"
      >
        <div>
          <label
            htmlFor="destination"
            className="mb-2 block text-sm font-semibold text-[#18202e]"
          >
            Destino o actividad
          </label>
          <div className="flex h-12 items-center gap-3 rounded-xl border border-[#e1e7ec] bg-[#fafbfc] px-3.5 transition-colors focus-within:border-[#0799a6] focus-within:bg-white">
            <MapPin className="size-5 shrink-0 text-[#7a8494]" />
            <input
              id="destination"
              type="text"
              placeholder="¿A dónde quieres ir?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full border-0 bg-transparent text-[15px] text-[#344054] outline-none placeholder:text-[#8b93a1]"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="date"
            className="mb-2 block text-sm font-semibold text-[#18202e]"
          >
            Fecha
          </label>
          <div className="flex h-12 items-center gap-3 rounded-xl border border-[#e1e7ec] bg-[#fafbfc] px-3.5 transition-colors focus-within:border-[#0799a6] focus-within:bg-white">
            <CalendarDays className="size-5 shrink-0 text-[#7a8494]" />
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border-0 bg-transparent text-[15px] text-[#344054] outline-none"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="people"
            className="mb-2 block text-sm font-semibold text-[#18202e]"
          >
            Personas
          </label>
          <div className="flex h-12 items-center gap-3 rounded-xl border border-[#e1e7ec] bg-[#fafbfc] px-3.5 transition-colors focus-within:border-[#0799a6] focus-within:bg-white">
            <Users className="size-5 shrink-0 text-[#7a8494]" />
            <select
              id="people"
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              className="w-full cursor-pointer appearance-none border-0 bg-transparent text-[15px] text-[#344054] outline-none"
            >
              <option>1 persona</option>
              <option>2 personas</option>
              <option>3 personas</option>
              <option>4 personas</option>
              <option>5 personas</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#f6534d] text-[15px] font-semibold text-white shadow-[0_8px_20px_rgba(246,83,77,0.28)] transition hover:-translate-y-0.5 hover:bg-[#e04540] md:col-span-2 xl:col-span-1"
        >
          <Search className="size-5" />
          Buscar tours
        </button>
      </form>

      <div className="relative z-[2] mt-5 flex flex-col items-center justify-center gap-3 text-sm font-semibold text-[#2a3444] md:flex-row md:gap-8">
        <div className="inline-flex items-center gap-2">
          <ShieldCheck className="size-4 text-[#0799a6]" />
          Pago seguro
        </div>
        <span className="hidden size-1 rounded-full bg-[#c5ccd6] md:block" />
        <div className="inline-flex items-center gap-2">
          <CheckCircle2 className="size-4 text-[#0799a6]" />
          Confirmación inmediata
        </div>
        <span className="hidden size-1 rounded-full bg-[#c5ccd6] md:block" />
        <div className="inline-flex items-center gap-2">
          <Headphones className="size-4 text-[#0799a6]" />
          Soporte rápido
        </div>
      </div>
    </section>
  );
}
