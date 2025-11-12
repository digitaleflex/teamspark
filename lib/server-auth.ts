import { betterAuth } from "better-auth";
import nodemailer from "nodemailer";

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.example.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || "user@example.com",
    pass: process.env.SMTP_PASS || "password",
  },
});

export const serverAuth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET!,
  url: process.env.BETTER_AUTH_URL!,
  emailAndPassword: {
    enabled: true,
    sendVerificationEmail: async ({ user, url }: { user: any; url: string }) => {
      try {
        await transporter.sendMail({
          from: {
            name: process.env.EMAIL_SENDER_NAME || "TeamSpark",
            address: process.env.EMAIL_SENDER_EMAIL || "noreply@example.com",
          },
          to: user.email,
          subject: "Vérifiez votre adresse e-mail pour TeamSpark",
          html: `
            <html>
              <head></head>
              <body>
                <p>Bonjour,</p>
                <p>Cliquez sur le lien ci-dessous pour vérifier votre adresse e-mail et vous connecter à TeamSpark :</p>
                <p><a href="${url}">Vérifier l'e-mail</a></p>
                <p>Si vous n'avez pas demandé cette vérification, veuillez ignorer cet e-mail.</p>
              </body>
            </html>
          `,
        });
        console.log(`Verification email sent to ${user.email} using Nodemailer.`);
      } catch (error) {
        console.error(`Error sending verification email to ${user.email} with Nodemailer:`, error);
        throw new Error("Failed to send verification email.");
      }
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 days
  },
});