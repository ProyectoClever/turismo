"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, UserRound } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { registerAccount, confirmUserEmail } from "@/app/actions/auth";
import {
  notifySignupConfirmation,
  subscribeNewsletterEmail,
} from "@/app/actions/brevo";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z"
      />
    </svg>
  );
}

const inputShell =
  "flex h-[52px] items-center gap-3 rounded-[10px] border border-[#dce3e8] bg-white px-4 transition focus-within:border-[#10a7b5] focus-within:shadow-[0_0_0_4px_rgba(16,167,181,0.12)]";

const inputClass =
  "w-full border-0 bg-transparent text-base text-[#0b1f3a] outline-none placeholder:text-[#98a2b3]";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/";
  const initialMode =
    searchParams.get("mode") === "signup" ? "signup" : "login";

  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [remember, setRemember] = useState(true);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const [error, setError] = useState<string | null>(() => {
    const err = searchParams.get("error");
    if (err === "auth") {
      return "No se pudo completar el acceso con Google/correo. Revisa que el Client ID OAuth y el redirect estén bien configurados.";
    }
    return null;
  });
  const [message, setMessage] = useState<string | null>(null);
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isSignup = mode === "signup";
  const visualSrc = "/login-visual.jpg";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (isSignup) {
      if (!acceptTerms) {
        setError("Debes aceptar los términos y condiciones.");
        return;
      }
      if (password.length < 6) {
        setError("La contraseña debe tener al menos 6 caracteres.");
        return;
      }
      if (password !== confirmPassword) {
        setError("Las contraseñas no coinciden.");
        return;
      }
    }

    setLoading(true);
    const supabase = createClient();
    const afterAuthPath =
      !redirect || redirect === "/" ? "/" : redirect;

    try {
      if (mode === "login") {
        let { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        // Si el correo no está confirmado, intentamos confirmarlo (service role) y reintentar
        if (
          signInError &&
          /email not confirmed/i.test(signInError.message)
        ) {
          const confirmed = await confirmUserEmail(email);
          if (confirmed.ok) {
            ({ error: signInError } = await supabase.auth.signInWithPassword({
              email,
              password,
            }));
          } else {
            setPendingEmail(email);
            throw new Error(
              confirmed.message.includes("SERVICE_ROLE")
                ? "Tu correo aún no está confirmado. Pega SUPABASE_SERVICE_ROLE_KEY en .env.local (Supabase → Settings → API) y reinicia el servidor, o confirma el enlace del correo."
                : confirmed.message
            );
          }
        }

        if (signInError) throw signInError;
        router.push(afterAuthPath);
        router.refresh();
      } else {
        const registered = await registerAccount({
          email,
          password,
          fullName,
        });

        if (!registered.ok) {
          if (/ya está registrado/i.test(registered.message)) {
            setMode("login");
          }
          throw new Error(registered.message);
        }

        if (newsletter) {
          void subscribeNewsletterEmail(email, fullName).catch(() => null);
        }

        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;

        router.push(afterAuthPath);
        router.refresh();
      }
    } catch (err) {
      const raw = err instanceof Error ? err.message : "Ocurrió un error";
      if (/email not confirmed/i.test(raw)) {
        setError(
          "Debes confirmar tu correo antes de iniciar sesión. Revisa tu bandeja o reenvía el correo de confirmación."
        );
        setPendingEmail(email);
      } else if (/invalid login credentials/i.test(raw)) {
        setError("Correo o contraseña incorrectos.");
      } else if (/user already registered/i.test(raw)) {
        setError("Ese correo ya está registrado. Inicia sesión.");
        setMode("login");
      } else {
        setError(raw);
      }
    } finally {
      setLoading(false);
    }
  }

  async function resendConfirmation() {
    const target = pendingEmail || email;
    if (!target) {
      setError("Escribe tu correo para reenviar la confirmación.");
      return;
    }
    setError(null);
    setMessage(null);
    setLoading(true);
    try {
      const supabase = createClient();
      const afterAuthPath =
        !redirect || redirect === "/" ? "/" : redirect;
      const { error: resendError } = await supabase.auth.resend({
        type: "signup",
        email: target,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(afterAuthPath)}`,
        },
      });
      if (resendError) throw resendError;
      void notifySignupConfirmation(target, fullName).catch(() => null);
      setMessage(
        `Correo de confirmación reenviado a ${target}. Revisa bandeja y spam.`
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo reenviar.");
    } finally {
      setLoading(false);
    }
  }

  async function onGoogle() {
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      const supabase = createClient();
      const afterAuthPath =
        !redirect || redirect === "/" ? "/" : redirect;
      // Siempre la URL actual (local o Railway), no forzar localhost
      const siteUrl = window.location.origin;

      const { data, error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${siteUrl}/auth/callback?next=${encodeURIComponent(afterAuthPath)}`,
          queryParams: {
            access_type: "offline",
            prompt: "select_account",
          },
        },
      });

      if (oauthError) {
        setError(
          /provider is not enabled/i.test(oauthError.message)
            ? "Google no está activado en Supabase → Authentication → Providers → Google."
            : /invalid_client|oauth client/i.test(oauthError.message)
              ? "Client ID/Secret de Google incorrectos en Supabase. Revisa las credenciales OAuth."
              : oauthError.message
        );
        return;
      }

      if (data?.url) {
        window.location.assign(data.url);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo abrir Google.");
    } finally {
      setLoading(false);
    }
  }

  function switchMode(next: "login" | "signup") {
    setMode(next);
    setError(null);
    setMessage(null);
    setConfirmPassword("");
    setShowPassword(false);
    setShowConfirm(false);
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-[radial-gradient(circle_at_15%_20%,rgba(16,167,181,0.08),transparent_30%),linear-gradient(135deg,#f7fafc_0%,#eef4f7_100%)] px-5 py-10 md:px-9 md:py-14">
      <div className="grid min-h-[700px] w-full max-w-[1200px] overflow-hidden rounded-[26px] bg-white shadow-[0_24px_70px_rgba(15,35,60,0.15)] lg:grid-cols-[42%_58%]">
        <section
          className="relative min-h-[240px] bg-[#0b1f3a] lg:min-h-0"
          aria-label="Imagen de viaje"
        >
          <Image
            src={visualSrc}
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 42vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(5,31,58,0.08))]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_70%,rgba(255,255,255,0.35))]" />
        </section>

        <section className="flex items-center justify-center bg-white px-7 py-10 md:px-14 md:py-12 lg:px-16">
          <div className="w-full max-w-[480px]">
            <BrandLogo size="lg" className="mb-8 md:mb-9" />

            <h1 className="m-0 mb-2.5 text-[36px] font-extrabold leading-[1.05] tracking-[-1.2px] text-[#0b1f3a] md:text-[42px]">
              {isSignup ? "Crear cuenta" : "Inicia sesión"}
            </h1>
            <p className="mb-7 text-base leading-[1.5] text-[#667085] md:mb-8 md:text-[17px]">
              {isSignup
                ? "Regístrate para gestionar tus reservas y guardar tus destinos favoritos."
                : "Accede a tu cuenta para gestionar tus reservas y favoritos."}
            </p>

            <form onSubmit={onSubmit} className="space-y-[18px]">
              {isSignup && (
                <div>
                  <label
                    htmlFor="fullName"
                    className="mb-2 block text-sm font-semibold text-[#475467]"
                  >
                    Nombre completo
                  </label>
                  <div className={inputShell}>
                    <UserRound className="size-5 shrink-0 text-[#8b98a9] stroke-[1.8]" />
                    <input
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ej. Ana Sofía Martínez"
                      required
                      className={inputClass}
                    />
                  </div>
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-[#475467]"
                >
                  Correo electrónico
                </label>
                <div className={inputShell}>
                  <Mail className="size-5 shrink-0 text-[#8b98a9] stroke-[1.8]" />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ejemplo@correo.com"
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-[#475467]"
                >
                  Contraseña
                </label>
                <div className={inputShell}>
                  <Lock className="size-5 shrink-0 text-[#8b98a9] stroke-[1.8]" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete={
                      isSignup ? "new-password" : "current-password"
                    }
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={
                      isSignup ? "••••••••••" : "Ingresa tu contraseña"
                    }
                    minLength={6}
                    required
                    className={inputClass}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="shrink-0 border-0 bg-transparent p-0 text-[#10a7b5]"
                    aria-label={
                      showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="size-5 stroke-[1.8]" />
                    ) : (
                      <Eye className="size-5 stroke-[1.8]" />
                    )}
                  </button>
                </div>
              </div>

              {isSignup && (
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-semibold text-[#475467]"
                  >
                    Confirmar contraseña
                  </label>
                  <div className={inputShell}>
                    <Lock className="size-5 shrink-0 text-[#8b98a9] stroke-[1.8]" />
                    <input
                      id="confirmPassword"
                      type={showConfirm ? "text" : "password"}
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••••"
                      minLength={6}
                      required
                      className={inputClass}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((v) => !v)}
                      className="shrink-0 border-0 bg-transparent p-0 text-[#10a7b5]"
                      aria-label={
                        showConfirm
                          ? "Ocultar confirmación"
                          : "Mostrar confirmación"
                      }
                    >
                      {showConfirm ? (
                        <EyeOff className="size-5 stroke-[1.8]" />
                      ) : (
                        <Eye className="size-5 stroke-[1.8]" />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {!isSignup && (
                <div className="flex items-center justify-between gap-5 pt-1 text-sm">
                  <label className="inline-flex items-center gap-2.5 text-[#475467]">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      className="size-[18px] accent-[#10a7b5]"
                    />
                    Recordarme
                  </label>
                  <a
                    href="#"
                    className="font-bold text-[#078d99] no-underline hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              )}

              {isSignup && (
                <div className="space-y-3 pt-1 text-sm text-[#475467]">
                  <label className="flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      className="mt-0.5 size-[18px] shrink-0 accent-[#10a7b5]"
                      required
                    />
                    <span>
                      Acepto los{" "}
                      <a
                        href="#"
                        className="font-semibold text-[#10a7b5] no-underline hover:underline"
                      >
                        términos y condiciones
                      </a>
                    </span>
                  </label>
                  <label className="flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      checked={newsletter}
                      onChange={(e) => setNewsletter(e.target.checked)}
                      className="mt-0.5 size-[18px] shrink-0 accent-[#10a7b5]"
                    />
                    <span>
                      Quiero recibir novedades y ofertas exclusivas por correo
                    </span>
                  </label>
                </div>
              )}

              {error && (
                <p className="text-sm text-red-600" role="alert">
                  {error}
                </p>
              )}
              {message && (
                <p className="text-sm text-[#078d99]" role="status">
                  {message}
                </p>
              )}
              {(pendingEmail || (!isSignup && email)) && (
                <button
                  type="button"
                  onClick={resendConfirmation}
                  disabled={loading}
                  className="text-left text-sm font-semibold text-[#0799a6] underline-offset-2 hover:underline disabled:opacity-60"
                >
                  Reenviar correo de confirmación
                </button>
              )}

              <button
                type="submit"
                disabled={loading}
                className={cn(
                  "mt-1 h-[54px] w-full cursor-pointer rounded-[10px] border-0",
                  "bg-[#10a7b5] text-[16px] font-extrabold text-white",
                  "shadow-[0_10px_24px_rgba(16,167,181,0.22)] transition hover:bg-[#078d99]",
                  "disabled:cursor-not-allowed disabled:opacity-70"
                )}
              >
                {loading
                  ? "Espera…"
                  : isSignup
                    ? "Crear cuenta"
                    : "Iniciar sesión"}
              </button>

              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3.5 pt-2 text-sm text-[#7b8797]">
                <span className="h-px bg-[#dce3e8]" />
                o continúa con
                <span className="h-px bg-[#dce3e8]" />
              </div>

              <button
                type="button"
                onClick={onGoogle}
                className="inline-flex h-[50px] w-full cursor-pointer items-center justify-center gap-3 rounded-[10px] border border-[#dce3e8] bg-white text-base font-bold text-[#0b1f3a] transition hover:bg-[#f7fafc]"
              >
                <GoogleMark />
                Google
              </button>

              <p className="pt-2 text-center text-[15px] text-[#667085]">
                {isSignup ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}{" "}
                <button
                  type="button"
                  className="cursor-pointer border-0 bg-transparent p-0 font-extrabold text-[#10a7b5]"
                  onClick={() => switchMode(isSignup ? "login" : "signup")}
                >
                  {isSignup ? "Inicia sesión" : "Regístrate"}
                </button>
              </p>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
