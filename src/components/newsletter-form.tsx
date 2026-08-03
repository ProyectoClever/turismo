"use client";

import { useState, useTransition } from "react";
import { subscribeNewsletter } from "@/app/actions/brevo";

export function NewsletterForm() {
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null);
    setError(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await subscribeNewsletter(formData);
      if (result.ok) {
        setMessage(result.message);
        e.currentTarget.reset();
      } else {
        setError(result.message);
      }
    });
  }

  return (
    <div>
      <form
        onSubmit={onSubmit}
        className="flex overflow-hidden rounded-lg border border-[#d9dde2] bg-white"
      >
        <input
          type="email"
          name="email"
          required
          placeholder="Tu correo electrónico"
          disabled={pending}
          className="min-w-0 flex-1 border-0 bg-transparent px-3.5 py-2.5 text-sm text-[#565e6b] outline-none placeholder:text-[#8b93a1] disabled:opacity-60"
        />
        <button
          type="submit"
          aria-label="Suscribirse"
          disabled={pending}
          className="inline-flex size-11 shrink-0 items-center justify-center bg-[#0799a6] text-white transition-colors hover:bg-[#068090] disabled:opacity-60"
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
            <path d="m22 2-7 20-4-9-9-4Z" />
            <path d="M22 2 11 13" />
          </svg>
        </button>
      </form>
      {message && (
        <p className="mt-2 text-xs font-medium text-[#0799a6]">{message}</p>
      )}
      {error && <p className="mt-2 text-xs font-medium text-[#e11d48]">{error}</p>}
    </div>
  );
}
