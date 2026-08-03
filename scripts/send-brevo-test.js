const fs = require("fs");
const nodemailer = require("nodemailer");

const env = Object.fromEntries(
  fs
    .readFileSync(".env.local", "utf8")
    .split(/\r?\n/)
    .filter((l) => l && !l.startsWith("#") && l.includes("="))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    })
);

async function main() {
  const transporter = nodemailer.createTransport({
    host: env.BREVO_SMTP_HOST,
    port: Number(env.BREVO_SMTP_PORT || 587),
    secure: false,
    auth: {
      user: env.BREVO_SMTP_USER,
      pass: env.BREVO_SMTP_KEY,
    },
  });

  const info = await transporter.sendMail({
    from: `${env.BREVO_SENDER_NAME || "TurismoGo"} <${env.BREVO_SENDER_EMAIL}>`,
    to: "alejandeod60@gmail.com",
    subject: "Prueba TurismoGo + Brevo",
    html: "<p>Hola, este es un correo de prueba desde <strong>TurismoGo</strong> usando Brevo SMTP.</p><p>Si lo recibes, la integración funciona.</p>",
  });

  console.log("OK", info.messageId, info.response);
}

main().catch((e) => {
  console.error("FAIL", e.message);
  process.exit(1);
});
