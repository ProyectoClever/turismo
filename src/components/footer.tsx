import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { NewsletterForm } from "@/components/newsletter-form";

const explore = [
  { href: "/tours", label: "Tours" },
  { href: "/destinos", label: "Destinos" },
  { href: "/tours", label: "Ofertas" },
] as const;

const info = [
  { href: "#", label: "Cómo funciona" },
  { href: "#", label: "Preguntas frecuentes" },
  { href: "#", label: "Términos y condiciones" },
] as const;

const support = [
  { href: "#", label: "Centro de ayuda" },
  { href: "#", label: "Contáctanos" },
  { href: "#", label: "Política de privacidad" },
] as const;

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="mb-4 text-base font-extrabold text-[#10213a]">{title}</h3>
      <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-[#5b657a] no-underline transition-colors hover:text-[#0799a6]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[#e8edf0] bg-[#f7f8fa]">
      <div className="w-full px-5 pt-14 pb-20 md:px-[70px] md:pt-16 md:pb-24 xl:px-[184px]">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,0.85fr)_1.35fr]">
          <div className="max-w-[280px]">
            <BrandLogo size="sm" />
            <p className="mt-3 text-sm leading-relaxed text-[#5b657a]">
              Tu plataforma de confianza para reservar tours y vivir
              experiencias inolvidables.
            </p>
          </div>

          <FooterColumn title="Explora" links={explore} />
          <FooterColumn title="Información" links={info} />
          <FooterColumn title="Soporte" links={support} />

          <div>
            <h3 className="mb-4 text-base font-extrabold text-[#10213a]">
              Recibe ofertas exclusivas
            </h3>
            <NewsletterForm />

            <div className="mt-4 flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="grid size-9 place-items-center rounded-full bg-[#e8edf0] text-[#3b4453] transition-colors hover:bg-[#0799a6] hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-4"
                  aria-hidden="true"
                >
                  <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1Z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="grid size-9 place-items-center rounded-full bg-[#e8edf0] text-[#3b4453] transition-colors hover:bg-[#0799a6] hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-4"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="WhatsApp"
                className="grid size-9 place-items-center rounded-full bg-[#e8edf0] text-[#3b4453] transition-colors hover:bg-[#0799a6] hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-4"
                  aria-hidden="true"
                >
                  <path d="M20.5 3.5A11 11 0 0 0 3.4 17.7L2 22l4.4-1.3A11 11 0 1 0 20.5 3.5Zm-8.5 17a9.1 9.1 0 0 1-4.6-1.3l-.3-.2-2.6.8.8-2.5-.2-.3a9.1 9.1 0 1 1 6.9 3.5Zm5-6.8c-.3-.1-1.6-.8-1.8-.9-.2-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.6.1a7.4 7.4 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.5-.6c.1-.2.1-.3 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.8 4.4 3.9 1.9.8 2.3.7 2.7.7.4 0 1.3-.5 1.5-1 .2-.5.2-.9.1-1 0-.1-.2-.2-.5-.3Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-[#e3e7ea] pt-8 pb-2">
          <p className="m-0 text-sm text-[#667085]">
            © {new Date().getFullYear()} TurismoGo. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
