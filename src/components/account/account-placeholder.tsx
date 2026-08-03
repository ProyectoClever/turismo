import Link from "next/link";

type PlaceholderProps = {
  title: string;
  description: string;
};

function AccountPlaceholder({ title, description }: PlaceholderProps) {
  return (
    <section className="rounded-2xl border border-[#e8edf0] bg-white p-8 shadow-[0_8px_24px_rgba(15,35,60,0.06)] md:p-10">
      <h1 className="m-0 text-2xl font-extrabold text-[#0b1f3a]">{title}</h1>
      <p className="mt-2 max-w-lg text-[#667085]">{description}</p>
      <p className="mt-6 text-sm text-[#98a2b3]">Próximamente</p>
      <Link
        href="/perfil"
        className="mt-4 inline-block text-sm font-semibold text-[#0799a6] no-underline hover:underline"
      >
        Volver a Mi perfil
      </Link>
    </section>
  );
}

export { AccountPlaceholder };
