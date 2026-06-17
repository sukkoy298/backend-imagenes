import nodemailer from "nodemailer";

const BATCH_SIZE = 20;
const DEFAULT_BASE_DELAY = 15000;
const DEFAULT_INCREMENT = 1000;
const SEND_MAIL_TIMEOUT = 15000;

export interface BatchResult {
  sent: number;
  failed: number;
  errors: { to: string; error: string }[];
}

export async function sendEmailsInBatches(
  messages: nodemailer.SendMailOptions[],
  baseDelayMs: number = DEFAULT_BASE_DELAY,
  incrementMs: number = DEFAULT_INCREMENT
): Promise<BatchResult> {
  const chunks: nodemailer.SendMailOptions[][] = [];
  for (let i = 0; i < messages.length; i += BATCH_SIZE) {
    chunks.push(messages.slice(i, i + BATCH_SIZE));
  }

  let sent = 0;
  let failed = 0;
  const errors: { to: string; error: string }[] = [];

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    console.log(`[Batch ${i + 1}/${chunks.length}] Enviando ${chunk.length} correo(s)...`);

    const results = await Promise.allSettled(
      chunk.map((msg) => {
        const timeoutPromise = new Promise<never>((_, reject) => {
          setTimeout(() => reject(new Error("SMTP timeout - 15s")), SEND_MAIL_TIMEOUT);
        });
        return Promise.race([transporter.sendMail(msg), timeoutPromise]);
      })
    );

    results.forEach((result, idx) => {
      const to = String(chunk[idx].to || "desconocido");
      if (result.status === "fulfilled") {
        sent++;
      } else {
        failed++;
        errors.push({ to, error: result.reason?.message || "Error desconocido" });
      }
    });

    if (i < chunks.length - 1) {
      const delay = baseDelayMs + i * incrementMs;
      console.log(`[Batch ${i + 1}/${chunks.length}] Esperando ${delay}ms antes del siguiente lote...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  return { sent, failed, errors };
}

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_ADRESS,
    pass: process.env.GMAIL_KEY_APP,
  },
  tls: {
    rejectUnauthorized: false,
  },
  connectionTimeout: 10000, // 10 segundos
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

// Verificar conexión SMTP al iniciar
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP connection error:", error);
  } else {
    console.log("SMTP server ready to send emails");
  }
});
