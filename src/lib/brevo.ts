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
  const listIds = input.listIds?.length ? input.listIds : [getDefaultListId()];
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

  return { email, listIds };
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
