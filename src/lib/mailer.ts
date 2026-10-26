import nodemailer, { type Transporter } from "nodemailer";
import { site } from "@/data/site";

/**
 * Outgoing mail for the website forms.
 *
 * Configure with environment variables (see .env.example). Any SMTP mailbox
 * works: cPanel/hosting mail, Google Workspace, Microsoft 365, Zoho, or an
 * email API's SMTP relay. Messages go to MAIL_TO (default info@flairtravels.com)
 * with Reply-To set to the visitor, so "Reply" answers them directly.
 */

const env = process.env;
export const MAIL_TO = env.MAIL_TO || site.email;

let transporter: Transporter | null = null;

function getTransporter() {
  if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASS) return null;
  if (!transporter) {
    const port = Number(env.SMTP_PORT || 465);
    transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port,
      // 465 uses implicit TLS; 587 upgrades with STARTTLS.
      secure: env.SMTP_SECURE ? env.SMTP_SECURE === "true" : port === 465,
      auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
    });
  }
  return transporter;
}

export type MailResult = { ok: true } | { ok: false; reason: "not-configured" | "failed" };

export async function sendMail(message: { subject: string; replyTo: string; text: string; html: string }): Promise<MailResult> {
  const transport = getTransporter();
  if (!transport) {
    if (process.env.NODE_ENV !== "production") {
      // Lets the forms be exercised locally without SMTP credentials.
      console.info(`[mail] SMTP not configured; would send to ${MAIL_TO}:\n${message.subject}\n\n${message.text}`);
      return { ok: true };
    }
    console.error("[mail] SMTP is not configured; set SMTP_HOST, SMTP_USER and SMTP_PASS.");
    return { ok: false, reason: "not-configured" };
  }
  try {
    await transport.sendMail({
      from: env.MAIL_FROM || `"Flair Travels website" <${env.SMTP_USER}>`,
      to: MAIL_TO,
      ...message,
    });
    return { ok: true };
  } catch (error) {
    console.error("[mail] send failed", error);
    return { ok: false, reason: "failed" };
  }
}

// ── template ─────────────────────────────────────────────────────────────

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Branded HTML + plain-text email from a list of label/value rows. */
export function renderEnquiryEmail({
  heading,
  reference,
  rows,
  message,
}: {
  heading: string;
  reference: string;
  rows: [label: string, value: string][];
  message?: string;
}) {
  const filled = rows.filter(([, v]) => v.trim());
  const text = [
    `${heading} · ${reference}`,
    "",
    ...filled.map(([k, v]) => `${k}: ${v}`),
    ...(message ? ["", "Message:", message] : []),
    "",
    `Sent from ${site.url}`,
  ].join("\n");

  const cell = "padding:10px 0;border-bottom:1px solid #E1EEF6;vertical-align:top;font:14px/1.5 Arial,sans-serif;";
  const html = `<!doctype html><html><body style="margin:0;background:#EEF7FC;padding:24px 12px;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;margin:0 auto;background:#ffffff;border-collapse:collapse;">
  <tr><td style="background:#1E2A36;padding:24px 28px;">
    <img src="${site.url}/brand/logo-reverse.png" width="170" alt="Flair Travels" style="display:block;border:0;">
  </td></tr>
  <tr><td style="height:4px;background:#E8439F;line-height:4px;font-size:0;">&nbsp;</td></tr>
  <tr><td style="padding:28px;">
    <p style="margin:0 0 4px;font:bold 11px/1 Arial,sans-serif;letter-spacing:3px;color:#14A0DC;text-transform:uppercase;">${escape(reference)}</p>
    <h1 style="margin:0 0 20px;font:bold 24px/1.2 Arial,sans-serif;color:#2C3C4C;">${escape(heading)}</h1>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
      ${filled
        .map(
          ([k, v]) =>
            `<tr><td style="${cell}width:150px;color:#6B7B8C;">${escape(k)}</td><td style="${cell}color:#2C3C4C;font-weight:bold;">${escape(v).replace(/\n/g, "<br>")}</td></tr>`,
        )
        .join("")}
    </table>
    ${
      message
        ? `<p style="margin:24px 0 6px;font:bold 11px/1 Arial,sans-serif;letter-spacing:3px;color:#E8439F;text-transform:uppercase;">Message</p>
    <div style="font:15px/1.6 Arial,sans-serif;color:#2C3C4C;background:#EEF7FC;padding:16px;border-left:4px solid #14A0DC;">${escape(message).replace(/\n/g, "<br>")}</div>`
        : ""
    }
    <p style="margin:28px 0 0;font:12px/1.5 Arial,sans-serif;color:#6B7B8C;">Reply to this email to answer the sender directly.</p>
  </td></tr>
  <tr><td style="background:#1E2A36;padding:16px 28px;font:11px/1.6 Arial,sans-serif;color:#CDE9F7;letter-spacing:1px;">
    FLAIR TRAVELS · TOURS &amp; TRAVEL · ${escape(site.phone)} · ${escape(site.postal)}, ${escape(site.city)}
  </td></tr>
</table></body></html>`;

  return { text, html };
}
