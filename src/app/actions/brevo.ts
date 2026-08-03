"use server";

import {
  createBrevoEmailCampaign,
  upsertBrevoContact,
  type CreateCampaignInput,
} from "@/lib/brevo";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export type BrevoActionResult =
  | { ok: true; message: string; data?: unknown }
  | { ok: false; message: string };

export async function subscribeNewsletter(formData: FormData): Promise<BrevoActionResult> {
  const email = String(formData.get("email") ?? "").trim();
  const fullName = String(formData.get("fullName") ?? "").trim();

  if (!isValidEmail(email)) {
    return { ok: false, message: "Introduce un correo válido." };
  }

  try {
    await upsertBrevoContact({
      email,
      fullName: fullName || undefined,
    });
    return {
      ok: true,
      message: "¡Listo! Te suscribiste a las ofertas de TurismoGo.",
    };
  } catch (error) {
    console.error("[brevo] subscribeNewsletter", error);
    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : "No se pudo completar la suscripción. Inténtalo de nuevo.",
    };
  }
}

export async function subscribeNewsletterEmail(
  email: string,
  fullName?: string
): Promise<BrevoActionResult> {
  if (!isValidEmail(email)) {
    return { ok: false, message: "Introduce un correo válido." };
  }

  try {
    await upsertBrevoContact({ email, fullName });
    return { ok: true, message: "Suscripción registrada en Brevo." };
  } catch (error) {
    console.error("[brevo] subscribeNewsletterEmail", error);
    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : "No se pudo sincronizar con Brevo.",
    };
  }
}

/**
 * Creates a Brevo email campaign.
 * Protected with BREVO_CAMPAIGN_SECRET (header/body `secret`) so it is not public.
 */
export async function createEmailCampaignAction(
  input: CreateCampaignInput & { secret?: string }
): Promise<BrevoActionResult> {
  const expected = process.env.BREVO_CAMPAIGN_SECRET?.trim();
  if (!expected || input.secret !== expected) {
    return { ok: false, message: "No autorizado." };
  }

  try {
    const { secret: _secret, ...campaign } = input;
    const data = await createBrevoEmailCampaign(campaign);
    return {
      ok: true,
      message: "Campaña creada en Brevo.",
      data,
    };
  } catch (error) {
    console.error("[brevo] createEmailCampaignAction", error);
    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : "No se pudo crear la campaña.",
    };
  }
}
