import { Suspense } from "react";
import type { Metadata } from "next";
import { LoginForm } from "@/components/login-form";

export const metadata: Metadata = {
  title: "Iniciar sesión | Turismo Go",
};

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="grid min-h-[100dvh] place-items-center bg-[#f7fafc] text-[#5b657a]">
          Cargando…
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
