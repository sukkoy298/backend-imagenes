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
});
