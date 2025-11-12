import { betterAuth } from "better-auth";

// Configuration de base pour l'authentification compatible Edge
export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET!,
  url: process.env.BETTER_AUTH_URL!,
  emailAndPassword: {
    enabled: true,
    // Pas d'envoi d'e-mail dans l'environnement Edge
    sendVerificationEmail: async ({ user, url }: { user: any; url: string }) => {
      // Dans l'environnement Edge, nous ne pouvons pas envoyer d'e-mails
      // L'envoi d'e-mails doit être fait côté serveur
      console.log(`Verification email should be sent to ${user.email}. URL: ${url}`);
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 days
  },
});