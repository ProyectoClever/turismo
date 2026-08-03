"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Building2,
  ChevronRight,
  Heart,
  Landmark,
  LayoutGrid,
  MapPin,
  Mountain,
  Palmtree,
  Star,
  Trees,
  Waves,
} from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "playa", label: "Playa", icon: Palmtree },
  { id: "ciudades", label: "Ciudades", icon: Building2 },
  { id: "naturaleza", label: "Naturaleza", icon: Trees },
  { id: "cultura", label: "Cultura", icon: Landmark },
  { id: "aventura", label: "Aventura", icon: Mountain },
  { id: "romantico", label: "Romántico", icon: Heart },
] as const;

const destinations = [
  {
    name: "Cartagena de Indias",
    description: "Historia, color y playa en una ciudad llena de magia.",
    location: "Bolívar, Colombia",
    experiences: 48,
    rating: "4.7",
    image:
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "San Andrés",
    description: "Aguas cristalinas y playas de ensueño en el Caribe colombiano.",
    location: "San Andrés y Providencia",
    experiences: 32,
    rating: "4.6",
    image:
      "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Machu Picchu",
    description: "Una maravilla del mundo que te conecta con la historia.",
    location: "Cusco, Perú",
    experiences: 36,
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Riviera Maya",
    description: "Playas paradisíacas y cultura maya en un solo lugar.",
    location: "Quintana Roo, México",
    experiences: 28,
    rating: "4.5",
    image:
      "https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Valle de Cocora",
    description: "Paisajes de ensueño entre montañas y palmas gigantes.",
    location: "Quindío, Colombia",
    experiences: 22,
    rating: "4.7",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
  },
] as const;

const collections = [
  {
    title: "Escapadas de playa",
    text: "Destinos para relajarte frente al mar",
    icon: Waves,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Rutas coloniales",
    text: "Ciudades llenas de historia y encanto",
    icon: Landmark,
    image:
      "https://images.unsplash.com/photo-1555881403-64995e224d73?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Naturaleza y aventura",
    text: "Conecta con paisajes increíbles",
    icon: Mountain,
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80",
  },
] as const;

export function DestinationsContent() {
  const [activeTab, setActiveTab] = useState("playa");
  const [liked, setLiked] = useState<string[]>([]);

  function toggleLike(name: string) {
    setLiked((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  }

  return (
    <section className="w-full bg-white px-5 py-8 pb-12 text-[#0d2340] md:px-[5%] xl:px-[13.5%]">
      <div className="mb-6 flex flex-wrap gap-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "inline-flex h-[41px] items-center justify-center gap-2 rounded-[10px] border px-[22px] text-sm transition-all",
                active
                  ? "border-[#13a5b4] bg-[#13a5b4] text-white shadow-[0_4px_10px_rgba(19,165,180,0.18)]"
                  : "border-[#e3e9ee] bg-white text-[#5b6677] hover:border-[#13a5b4]/40"
              )}
            >
              <Icon className="size-4" strokeWidth={1.75} />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="mb-3.5 flex items-center justify-between gap-4">
        <h2 className="m-0 text-xl font-extrabold">Destinos destacados</h2>
        <Link
          href="/destinos"
          className="inline-flex items-center gap-1 text-[13px] font-bold text-[#13a5b4] no-underline hover:text-[#0f8a97]"
        >
          Ver todos los destinos
          <ChevronRight className="size-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {destinations.map((destination) => {
          const isLiked = liked.includes(destination.name);
          return (
            <article
              key={destination.name}
              className="overflow-hidden rounded-[14px] border border-[#e3e9ee] bg-white shadow-[0_3px_10px_rgba(15,35,60,0.06)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(15,35,60,0.1)]"
            >
              <div className="relative h-40">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 33vw, 16vw"
                />
                <button
                  type="button"
                  aria-label="Guardar destino"
                  onClick={() => toggleLike(destination.name)}
                  className="absolute top-2.5 right-2.5 grid size-[34px] place-items-center rounded-full border-0 bg-white/95 text-[#7b8796] shadow-sm transition-colors hover:text-[#13a5b4]"
                >
                  <Heart
                    className={cn(
                      "size-4",
                      isLiked && "fill-[#f6534d] text-[#f6534d]"
                    )}
                  />
                </button>
              </div>

              <div className="px-[15px] pt-[11px] pb-3.5">
                <h3 className="m-0 mb-1.5 text-base font-bold leading-snug">
                  {destination.name}
                </h3>
                <p className="mb-2 min-h-[38px] text-xs leading-[1.45] text-[#5f6b7c]">
                  {destination.description}
                </p>
                <div className="mb-2 flex items-center gap-1.5 text-[11px] text-[#647184]">
                  <MapPin className="size-3 shrink-0" />
                  {destination.location}
                </div>
                <div className="mb-3.5 flex items-center justify-between text-[11px] text-[#647184]">
                  <span className="inline-flex items-center gap-1">
                    <LayoutGrid className="size-3" />
                    {destination.experiences} experiencias
                  </span>
                  <span className="inline-flex items-center gap-1 text-[#344054]">
                    <Star className="size-3 fill-[#ffb000] text-[#ffb000]" />
                    {destination.rating}
                  </span>
                </div>
                <Link
                  href="/tours"
                  className="inline-flex h-8 w-full items-center justify-center rounded-[7px] border border-[#13a5b4] bg-white text-xs font-bold text-[#13a5b4] transition-colors hover:bg-[#13a5b4] hover:text-white"
                >
                  Explorar destino
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      <h2 className="mt-[18px] mb-3 text-xl font-extrabold">
        Colecciones para inspirarte
      </h2>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {collections.map((collection) => {
          const Icon = collection.icon;
          return (
            <article
              key={collection.title}
              className="relative h-[106px] overflow-hidden rounded-[13px]"
            >
              <Image
                src={collection.image}
                alt={collection.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[rgba(5,25,40,0.68)] to-[rgba(5,25,40,0.08)]" />
              <div className="absolute top-[26px] left-[22px] z-[2] text-white">
                <h3 className="m-0 mb-1 text-lg font-bold">{collection.title}</h3>
                <p className="m-0 text-[13px] opacity-95">{collection.text}</p>
              </div>
              <div className="absolute top-7 right-[22px] z-[2] grid size-12 place-items-center rounded-full bg-white text-[#13a5b4]">
                <Icon className="size-5" strokeWidth={1.75} />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
