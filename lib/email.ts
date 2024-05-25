export const smtpOptions = {
  host: process.env.SMTP_HOST || "mail.sfu-kras.ru",
  port: parseInt(process.env.SMTP_PORT || "465"),
  secure: true,
  auth: {
    user: process.env.SMTP_USER || "user",
    pass: process.env.SMTP_PASSWORD || "password",
  },
}