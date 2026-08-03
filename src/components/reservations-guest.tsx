"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useRef } from "react";
import {
  CalendarCheck2,
  FileText,
  Headphones,
  Lock,
  Mail,
  Search,
  Ticket,
  UserRound,
} from "lucide-react";
import { cn } from "@/lib/utils";

const benefits = [
  {
    icon: FileText,
    title: "Ver estado de la reserva",
    description:
      "Consulta en tiempo real el estado de tus reservas y detalles del viaje.",
  },
  {
    icon: Ticket,
    title: "Descargar voucher",
    description: "Descarga tus comprobantes y vouchers de cada reserva.",
  },
  {
    icon: Headphones,
    title: "Solicitar cambios o soporte",
    description: "Gestiona cambios, cancelaciones o solicitudes de soporte.",
  },
] as const;

export function ReservationsGuest() {
  const lookupRef = useRef<HTMLElement>(null);
  const codeRef = useRef<HTMLInputElement>(null);

  function scrollToLookup() {
    lookupRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => codeRef.current?.focus(), 350);
  }

  function handleLookup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <main className="w-full px-5 py-5 md:px-[5%] md:py-6 xl:px-[13.5%]">
      <div className="grid items-stretch gap-5 lg:grid-cols-[minmax(0,1.55fr)_minmax(360px,0.9fr)]">
        <section className="flex flex-col rounded-[17px] border border-[#e3e9ee] bg-white p-6 shadow-[0_4px_14px_rgba(16,24,40,0.05)] md:p-10 lg:p-12">
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(240px,0.95fr)] lg:gap-6">
            <div className="min-w-0">
              <div
                className="grid size-[65px] place-items-center rounded-full bg-[#edf9fb] text-[#0b9eaa]"
                aria-hidden="true"
              >
                <CalendarCheck2 className="size-9 stroke-[1.8]" />
              </div>

              <h1 className="mt-8 mb-[18px] text-[34px] font-extrabold leading-[1.05] tracking-[-1.2px] text-[#081d3c] md:text-[44px] md:tracking-[-1.5px] xl:text-[48px]">
                Consulta tus reservas
              </h1>

              <p className="mb-8 max-w-[440px] text-[17px] leading-[1.55] text-[#667085] md:text-lg">
                Inicia sesión para ver tus próximos viajes, descargar
                comprobantes y gestionar cambios o cancelaciones.
              </p>

              <Link
                href="/login?redirect=/mis-reservas"
                className={cn(
                  "inline-flex h-14 w-full max-w-[350px] items-center justify-center gap-3 rounded-[9px]",
                  "bg-[linear-gradient(135deg,#0797a4,#0ba8b4)] text-lg font-bold text-white no-underline",
                  "shadow-[0_8px_18px_rgba(11,158,170,0.18)] transition hover:brightness-[1.03]"
                )}
              >
                <UserRound className="size-[25px] stroke-[1.8]" />
                Iniciar sesión
              </Link>

              <div className="my-7 grid w-full max-w-[350px] grid-cols-[1fr_auto_1fr] items-center gap-4 text-lg font-bold text-[#081d3c]">
                <span className="h-px bg-[#dfe5ea]" />
                o
                <span className="h-px bg-[#dfe5ea]" />
              </div>

              <button
                type="button"
                onClick={scrollToLookup}
                className="inline-flex h-[62px] w-full max-w-[350px] cursor-pointer items-center justify-center gap-3 rounded-[9px] border-[1.5px] border-[#0b9eaa] bg-white text-[17px] font-bold text-[#078a95] transition hover:bg-[#edf9fb]"
              >
                <Search className="size-[25px] stroke-[1.8]" />
                Buscar reserva con código
              </button>
            </div>

            <div className="relative mx-auto aspect-square w-full max-w-[420px] lg:mx-0 lg:mt-2 lg:max-w-none lg:self-center">
              <Image
                src="/reservas-ilustracion.png"
                alt="Maleta de viaje con sombrero y avión"
                fill
                className="object-contain object-center"
                sizes="(max-width: 1024px) 70vw, 420px"
                priority
              />
            </div>
          </div>

          <div className="mt-10 grid gap-6 rounded-[14px] border border-[#e3e9ee] bg-white p-5 sm:grid-cols-3 sm:gap-0 sm:px-2 sm:py-6 md:mt-12">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;

              return (
                <article
                  key={benefit.title}
                  className={cn(
                    "flex flex-col items-center px-4 text-center sm:px-5",
                    index > 0 && "border-[#dfe5ea] sm:border-l"
                  )}
                >
                  <div className="mb-4 grid size-[54px] place-items-center rounded-full bg-[#edf9fb] text-[#0b9eaa]">
                    <Icon className="size-[31px] stroke-[1.8]" />
                  </div>
                  <h3 className="mb-2 text-[16px] font-extrabold text-[#081d3c] xl:text-[17px]">
                    {benefit.title}
                  </h3>
                  <p className="m-0 max-w-[240px] text-sm leading-[1.45] text-[#667085]">
                    {benefit.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <aside
          ref={lookupRef}
          className="flex flex-col rounded-[17px] border border-[#e3e9ee] bg-white p-6 shadow-[0_4px_14px_rgba(16,24,40,0.05)] md:p-10 lg:p-11"
        >
          <div
            className="grid size-[65px] place-items-center rounded-full bg-[#edf9fb] text-[#0b9eaa]"
            aria-hidden="true"
          >
            <Search className="size-9 stroke-[1.8]" />
          </div>

          <h2 className="mb-2.5 mt-7 text-[28px] font-extrabold leading-[1.1] tracking-[-0.8px] text-[#081d3c] md:text-[31px]">
            Buscar reserva con código
          </h2>

          <p className="mb-8 max-w-[420px] text-[17px] leading-[1.5] text-[#667085]">
            Si realizaste una compra sin cuenta, ingresa los datos para
            consultar tu reserva.
          </p>

          <form onSubmit={handleLookup} className="space-y-[26px]">
            <div>
              <label
                htmlFor="reservation-code"
                className="mb-2.5 block text-base font-bold text-[#081d3c]"
              >
                Código de reserva
              </label>
              <div className="flex h-14 items-center gap-3 rounded-lg border border-[#dbe2e8] bg-white px-[18px]">
                <Ticket className="size-6 shrink-0 text-[#9aa6b5] stroke-[1.7]" />
                <input
                  ref={codeRef}
                  id="reservation-code"
                  name="code"
                  type="text"
                  placeholder="Ej. TG8F7A2"
                  className="w-full border-0 bg-transparent text-base text-[#344054] outline-none placeholder:text-[#98a2b3]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="purchase-email"
                className="mb-2.5 block text-base font-bold text-[#081d3c]"
              >
                Correo electrónico usado en la compra
              </label>
              <div className="flex h-14 items-center gap-3 rounded-lg border border-[#dbe2e8] bg-white px-[18px]">
                <Mail className="size-6 shrink-0 text-[#9aa6b5] stroke-[1.7]" />
                <input
                  id="purchase-email"
                  name="email"
                  type="email"
                  placeholder="ejemplo@correo.com"
                  className="w-full border-0 bg-transparent text-base text-[#344054] outline-none placeholder:text-[#98a2b3]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 inline-flex h-[60px] w-full cursor-pointer items-center justify-center gap-3 rounded-lg bg-[linear-gradient(135deg,#0797a4,#0ba8b4)] text-[17px] font-bold text-white shadow-[0_8px_18px_rgba(11,158,170,0.15)] transition hover:brightness-[1.03]"
            >
              <Search className="size-[25px] stroke-[1.8]" />
              Consultar reserva
            </button>
          </form>

          <div className="mt-auto grid grid-cols-[auto_1fr] items-start gap-[15px] rounded-[10px] bg-[linear-gradient(135deg,#eef9fb,#e8f5f8)] p-5 pt-6 md:mt-10 md:p-6 md:px-[22px]">
            <div className="grid size-[38px] place-items-center rounded-full bg-[#dff4f7] text-[#0b9eaa]">
              <Lock className="size-[22px] stroke-[1.8]" />
            </div>
            <div>
              <h3 className="mb-1.5 text-[15px] font-bold text-[#081d3c]">
                Tus datos están protegidos
              </h3>
              <p className="m-0 text-[13px] leading-[1.45] text-[#344054]">
                Utilizamos cifrado y medidas de seguridad para proteger tu
                información personal.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
