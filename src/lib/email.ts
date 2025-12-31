"use server";

// Import nodemailer dynamically at runtime to avoid compile-time issues when
// the package is not installed in some environments.


type MailOptions = {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
};

async function getTransporter() {
  const nodemailer = await import("nodemailer");
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) {
    throw new Error("SMTP environment variables not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS.");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for other ports
    auth: {
      user,
      pass,
    },
  });
}

export async function sendMail(opts: MailOptions) {
  const transporter = await getTransporter();
  const from = process.env.EMAIL_FROM ?? process.env.SMTP_USER;

  const info = await transporter.sendMail({
    from,
    to: opts.to,
    subject: opts.subject,
    text: opts.text,
    html: opts.html,
  });

  return info;
}
