import { betterAuth } from "better-auth";
import { twoFactor } from "better-auth/plugins";
import { sendVerificationEmail as sendEmail } from "./email";

// Configuration de base pour l'authentification compatible Edge
export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET!,
  url: process.env.BETTER_AUTH_URL!,
  emailAndPassword: {
    enabled: true,
    // Pas d'envoi d'e-mail dans l'environnement Edge
    sendVerificationEmail: async ({ user, url }: { user: any; url: string }) => {
      await sendEmail(user.email, url);
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 days
  },
  emailVerification: {
    autoSignInAfterVerification: false, // L'utilisateur doit se connecter après vérification
  },
  plugins: [
    twoFactor({
      // Configuration par défaut
    }),
  ],
});