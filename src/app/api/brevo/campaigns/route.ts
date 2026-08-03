import { NextResponse } from "next/server";
import { createBrevoEmailCampaign } from "@/lib/brevo";

/**
 * POST /api/brevo/campaigns
 * Body matches Brevo create-campaign sample + `secret` (BREVO_CAMPAIGN_SECRET).
 *
 * Example:
 * {
 *   "secret": "...",
 *   "name": "Campaign sent via the API",
 *   "subject": "My subject",
 *   "htmlContent": "<p>Congratulations!...</p>",
 *   "listIds": [2],
 *   "scheduledAt": "2018-01-01 00:00:01"
 * }
 */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      secret?: string;
      name?: string;
      subject?: string;
      htmlContent?: string;
      listIds?: number[];
      scheduledAt?: string;
      senderName?: string;
      senderEmail?: string;
    };

    const expected = process.env.BREVO_CAMPAIGN_SECRET?.trim();
    if (!expected || body.secret !== expected) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    if (!body.name || !body.subject || !body.htmlContent) {
      return NextResponse.json(
        { error: "name, subject y htmlContent son obligatorios" },
        { status: 400 }
      );
    }

    const data = await createBrevoEmailCampaign({
      name: body.name,
      subject: body.subject,
      htmlContent: body.htmlContent,
      listIds: body.listIds,
      scheduledAt: body.scheduledAt,
      senderName: body.senderName,
      senderEmail: body.senderEmail,
    });

    return NextResponse.json({ ok: true, data }, { status: 201 });
  } catch (error) {
    console.error("[brevo] POST /api/brevo/campaigns", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Error al crear la campaña",
      },
      { status: 500 }
    );
  }
}
