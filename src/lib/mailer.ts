import nodemailer from "nodemailer";

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
