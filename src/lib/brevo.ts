import { BrevoClient } from "@getbrevo/brevo";

function getApiKey() {
  const key = process.env.BREVO_API_KEY?.trim();
  if (!key) {
    throw new Error("Falta BREVO_API_KEY en las variables de entorno.");
  }
  return key;
}

export function getBrevoClient() {
  return new BrevoClient({ apiKey: getApiKey() });
}

function getDefaultListId() {
  const raw = process.env.BREVO_LIST_ID?.trim();
  const id = raw ? Number(raw) : NaN;
  if (!Number.isFinite(id) || id <= 0) {
    throw new Error("Falta BREVO_LIST_ID (ID numérico de la lista en Brevo).");
  }
  return id;
}

function getSender() {
  const email = process.env.BREVO_SENDER_EMAIL?.trim();
  const name = process.env.BREVO_SENDER_NAME?.trim() || "TurismoGo";
  if (!email) {
    throw new Error("Falta BREVO_SENDER_EMAIL (remitente verificado en Brevo).");
  }
  return { name, email };
}

export type UpsertContactInput = {
  email: string;
  fullName?: string;
  listIds?: number[];
};

/** Adds or updates a contact and attaches it to the newsletter list. */
export async function upsertBrevoContact(input: UpsertContactInput) {
  const client = getBrevoClient();
  const listIdRaw = process.env.BREVO_LIST_ID?.trim();
  const defaultListId = listIdRaw ? Number(listIdRaw) : NaN;
  const listIds = input.listIds?.length
    ? input.listIds
    : Number.isFinite(defaultListId) && defaultListId > 0
      ? [defaultListId]
      : undefined;
  const email = input.email.trim().toLowerCase();

  const attributes: Record<string, string> = {};
  if (input.fullName?.trim()) {
    attributes.FNAME = input.fullName.trim();
  }

  await client.contacts.createContact({
    email,
    listIds,
    updateEnabled: true,
    attributes: Object.keys(attributes).length ? attributes : undefined,
  });

  return { email, listIds: listIds ?? [] };
}

export type CreateCampaignInput = {
  name: string;
  subject: string;
  htmlContent: string;
  listIds?: number[];
  /** UTC date-time, e.g. `2017-06-01T12:30:00+02:00`. Omit to leave as draft. */
  scheduledAt?: string;
  senderName?: string;
  senderEmail?: string;
};

/** Creates an email campaign (Brevo Email Campaigns API). */
export async function createBrevoEmailCampaign(input: CreateCampaignInput) {
  const client = getBrevoClient();
  const defaultSender = getSender();
  const listIds = input.listIds?.length ? input.listIds : [getDefaultListId()];

  const data = await client.emailCampaigns.createEmailCampaign({
    name: input.name,
    subject: input.subject,
    sender: {
      name: input.senderName || defaultSender.name,
      email: input.senderEmail || defaultSender.email,
    },
    htmlContent: input.htmlContent,
    recipients: { listIds },
    ...(input.scheduledAt ? { scheduledAt: input.scheduledAt } : {}),
  });

  return data;
}

export type SendEmailInput = {
  toEmail: string;
  toName?: string;
  subject: string;
  htmlContent: string;
};

/** Sends a transactional email through Brevo. */
export async function sendBrevoEmail(input: SendEmailInput) {
  const client = getBrevoClient();
  const sender = getSender();

  return client.transactionalEmails.sendTransacEmail({
    sender,
    to: [
      {
        email: input.toEmail.trim().toLowerCase(),
        name: input.toName?.trim() || undefined,
      },
    ],
    subject: input.subject,
    htmlContent: input.htmlContent,
  });
}

/** Notice after signup while Supabase also sends the confirmation link email. */
export async function sendSignupConfirmNotice(input: {
  email: string;
  fullName?: string;
  loginUrl: string;
}) {
  const name = input.fullName?.trim() || "viajero";
  return sendBrevoEmail({
    toEmail: input.email,
    toName: name,
    subject: "Confirma tu cuenta en TurismoGo",
    htmlContent: `
      <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#0b1f3a">
        <h1 style="font-size:22px;margin:0 0 12px">Hola ${name},</h1>
        <p style="font-size:15px;line-height:1.5;color:#475467">
          Gracias por registrarte en <strong>TurismoGo</strong>.
          Para activar tu cuenta debes <strong>confirmar tu correo</strong>.
        </p>
        <p style="font-size:15px;line-height:1.5;color:#475467">
          Revisa tu bandeja (y spam): te llega un correo con el botón
          <strong>Confirm your mail</strong> / <strong>Confirmar correo</strong>.
          Al pulsarlo autorizas la cuenta y ya puedes iniciar sesión.
        </p>
        <p style="margin:24px 0">
          <a href="${input.loginUrl}"
             style="display:inline-block;background:#10a7b5;color:#fff;text-decoration:none;padding:12px 18px;border-radius:8px;font-weight:700">
            Ir a iniciar sesión
          </a>
        </p>
        <p style="font-size:13px;color:#98a2b3">Si no creaste esta cuenta, ignora este mensaje.</p>
      </div>
    `,
  });
}
