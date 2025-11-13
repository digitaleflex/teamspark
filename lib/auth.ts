import { betterAuth } from "better-auth";
import { twoFactor } from "better-auth/plugins";
import { 
  sendVerificationEmail, 
  sendPasswordResetEmail,
  sendPasswordResetConfirmationEmail,
  sendWelcomeEmail
} from "./email";

// Configuration de base pour l'authentification
export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET!,
  url: process.env.BETTER_AUTH_URL!,
  emailAndPassword: {
    enabled: true,
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
  advanced: {
    generateId: () => crypto.randomUUID(),
    sendEmail: async (type: string, data: any) => {
      try {
        switch (type) {
          case "EMAIL_VERIFICATION":
            await sendVerificationEmail(
              data.user.email, 
              data.url, 
              data.user.name
            );
            console.log(`Verification email sent to ${data.user.email} using Brevo.`);
            break;
            
          case "PASSWORD_RESET":
            await sendPasswordResetEmail(
              data.user.email, 
              data.url, 
              data.user.name
            );
            console.log(`Password reset email sent to ${data.user.email} using Brevo.`);
            break;
            
          case "EMAIL_CHANGE":
            // Pas d'implémentation spécifique pour le moment
            break;
        }
      } catch (error) {
        console.error(`Error sending ${type} email to ${data.user.email} with Brevo:`, error);
        throw new Error(`Failed to send ${type} email.`);
      }
    },
    afterEmailVerification: async (user: any) => {
      try {
        await sendWelcomeEmail(user.email, user.name);
        console.log(`Welcome email sent to ${user.email} using Brevo.`);
      } catch (error) {
        console.error(`Error sending welcome email to ${user.email} with Brevo:`, error);
      }
      return user;
    },
    afterPasswordReset: async (user: any) => {
      try {
        await sendPasswordResetConfirmationEmail(user.email, user.name);
        console.log(`Password reset confirmation email sent to ${user.email} using Brevo.`);
      } catch (error) {
        console.error(`Error sending password reset confirmation email to ${user.email} with Brevo:`, error);
      }
      return user;
    }
  }
});