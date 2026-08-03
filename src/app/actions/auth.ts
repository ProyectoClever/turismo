"use server";

import { redirect } from "next/navigation";
import { createAdminClient, hasServiceRoleKey } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { sendSignupConfirmNotice } from "@/lib/brevo";

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export type AuthActionResult =
  | { ok: true; message?: string }
  | { ok: false; message: string };

/**
 * Creates a confirmed account so the user can log in immediately.
 * Requires SUPABASE_SERVICE_ROLE_KEY in env.
 */
export async function registerAccount(input: {
  email: string;
  password: string;
  fullName: string;
}): Promise<AuthActionResult> {
  const email = input.email.trim().toLowerCase();
  const password = input.password;
  const fullName = input.fullName.trim();

  if (!email || !password || !fullName) {
    return { ok: false, message: "Completa nombre, correo y contraseña." };
  }
  if (password.length < 6) {
    return { ok: false, message: "La contraseña debe tener al menos 6 caracteres." };
  }
  if (!hasServiceRoleKey()) {
    return {
      ok: false,
      message:
        "Falta configurar SUPABASE_SERVICE_ROLE_KEY en .env.local (Supabase → Settings → API → service_role). Reinicia npm run dev después de pegarla.",
    };
  }

  try {
    const admin = createAdminClient();

    const { data, error } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: fullName },
    });

    if (error) {
      if (/already|registered|exists/i.test(error.message)) {
        return {
          ok: false,
          message: "Ese correo ya está registrado. Inicia sesión.",
        };
      }
      return { ok: false, message: error.message };
    }

    if (data.user) {
      // Ensure profile row exists even if trigger failed
      await admin.from("profiles").upsert(
        {
          id: data.user.id,
          full_name: fullName,
        },
        { onConflict: "id" }
      );
    }

    const origin =
      process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
      "http://localhost:3000";
    void sendSignupConfirmNotice({
      email,
      fullName,
      loginUrl: `${origin}/login`,
    }).catch(() => null);

    return { ok: true, message: "Cuenta creada. Ya puedes iniciar sesión." };
  } catch (error) {
    console.error("[auth] registerAccount", error);
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "No se pudo crear la cuenta.",
    };
  }
}

/** Confirms an existing unconfirmed user (admin). Used after support recovery. */
export async function confirmUserEmail(email: string): Promise<AuthActionResult> {
  if (!hasServiceRoleKey()) {
    return { ok: false, message: "Falta SUPABASE_SERVICE_ROLE_KEY." };
  }

  try {
    const admin = createAdminClient();
    const normalized = email.trim().toLowerCase();
    const { data: list, error: listError } = await admin.auth.admin.listUsers({
      page: 1,
      perPage: 200,
    });
    if (listError) return { ok: false, message: listError.message };

    const user = list.users.find((u) => u.email?.toLowerCase() === normalized);
    if (!user) return { ok: false, message: "No encontramos ese correo." };

    const { error } = await admin.auth.admin.updateUserById(user.id, {
      email_confirm: true,
    });
    if (error) return { ok: false, message: error.message };

    return { ok: true, message: "Correo confirmado. Ya puedes iniciar sesión." };
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "No se pudo confirmar el correo.",
    };
  }
}
