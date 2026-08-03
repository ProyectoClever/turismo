"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export function DestinationsHero() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    router.push(`/destinos${params.toString() ? `?${params}` : ""}`);
  }

  return (
    <section className="relative isolate min-h-[300px] overflow-hidden bg-white px-5 py-10 md:min-h-[320px] md:px-[5%] md:py-8 xl:px-[13.5%]">
      {/* Mapa integrado a la derecha */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-0 w-full md:w-[62%] xl:w-[58%]"
        style={{
          backgroundImage: `url("/mapa-destinos.png")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right center",
          backgroundSize: "contain",
        }}
      />

      {/* Degradados blancos para fundir el mapa */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          backgroundImage: `
            linear-gradient(
              90deg,
              #ffffff 0%,
              #ffffff 34%,
              rgba(255, 255, 255, 0.92) 46%,
              rgba(255, 255, 255, 0.55) 58%,
              rgba(255, 255, 255, 0.15) 72%,
              transparent 86%
            ),
            linear-gradient(
              180deg,
              #ffffff 0%,
              transparent 18%,
              transparent 82%,
              #ffffff 100%
            )
          `,
        }}
      />

      <div className="relative z-[2] max-w-[430px]">
        <h1 className="m-0 text-[clamp(32px,4vw,43px)] font-extrabold leading-[1.08] tracking-[-0.04em] text-[#0b1f3a]">
          Explora destinos para tu próxima aventura
        </h1>

        <p className="mt-[18px] mb-6 max-w-[405px] text-base leading-[1.45] text-[#667085]">
          Descubre lugares increíbles y encuentra inspiración según el tipo de
          experiencia que buscas.
        </p>

        <form
          onSubmit={onSubmit}
          className="flex h-12 w-full max-w-[405px] items-center gap-3 rounded-xl border border-[#dce3e8] bg-white/95 px-4 shadow-[0_5px_14px_rgba(15,35,60,0.08)] backdrop-blur-sm"
        >
          <Search className="size-5 shrink-0 text-[#7c8797]" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="¿A dónde te gustaría viajar?"
            className="w-full border-0 bg-transparent text-[15px] text-[#344054] outline-none placeholder:text-[#98a2b3]"
            aria-label="Buscar destinos"
          />
        </form>
      </div>
    </section>
  );
}
