import * as Brevo from '@getbrevo/brevo';

const api = new Brevo.TransactionalEmailsApi();

api.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY!);

// Template de base pour tous les e-mails
const baseTemplate = (content: string, footerText: string = "Ceci est un e-mail automatique, veuillez ne pas y répondre.") => `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TeamSpark</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #0070f3;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .header h1 {
            color: #0070f3;
            margin: 0;
        }
        .content {
            margin-bottom: 30px;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #0070f3;
            color: white !important;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            margin: 20px 0;
        }
        .button:hover {
            background-color: #0051a2;
        }
        .footer {
            text-align: center;
            border-top: 1px solid #eee;
            padding-top: 20px;
            font-size: 12px;
            color: #777;
        }
        .footer a {
            color: #0070f3;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>TeamSpark</h1>
        </div>
        <div class="content">
            ${content}
        </div>
        <div class="footer">
            <p>${footerText}</p>
            <p>© ${new Date().getFullYear()} TeamSpark. Tous droits réservés.</p>
            <p>
                <a href="${process.env.BETTER_AUTH_URL}">Visiter notre site</a> | 
                <a href="${process.env.BETTER_AUTH_URL}/contact">Contact</a>
            </p>
        </div>
    </div>
</body>
</html>
`;

// 1. E-mail de vérification d'adresse e-mail
export async function sendVerificationEmail(email: string, verificationLink: string, userName?: string) {
    const sendSmtpEmail = new Brevo.SendSmtpEmail();
    
    sendSmtpEmail.subject = 'Vérifiez votre adresse e-mail - TeamSpark';
    sendSmtpEmail.to = [{ email }];
    sendSmtpEmail.sender = { 
        email: process.env.BREVO_SENDER_EMAIL!, 
        name: process.env.BREVO_SENDER_NAME! 
    };
    
    const content = `
        <h2>Bienvenue${userName ? ` ${userName}` : ''} !</h2>
        <p>Merci de vous être inscrit sur TeamSpark.</p>
        <p>Pour finaliser votre inscription et sécuriser votre compte, veuillez vérifier votre adresse e-mail en cliquant sur le bouton ci-dessous :</p>
        <div style="text-align: center;">
            <a href="${verificationLink}" class="button">Vérifier mon e-mail</a>
        </div>
        <p>Si vous ne parvenez pas à cliquer sur le bouton, copiez et collez le lien suivant dans votre navigateur :</p>
        <p><a href="${verificationLink}">${verificationLink}</a></p>
        <p>Cette vérification est nécessaire pour accéder à toutes les fonctionnalités de TeamSpark.</p>
    `;
    
    sendSmtpEmail.htmlContent = baseTemplate(content);
    
    try {
        await api.sendTransacEmail(sendSmtpEmail);
        console.log(`Verification email sent successfully to ${email}`);
    } catch (error) {
        console.error('Error sending verification email:', error);
        throw new Error('Could not send verification email.');
    }
}

// 2. E-mail de réinitialisation de mot de passe
export async function sendPasswordResetEmail(email: string, resetLink: string, userName?: string) {
    const sendSmtpEmail = new Brevo.SendSmtpEmail();
    
    sendSmtpEmail.subject = 'Réinitialisation de votre mot de passe - TeamSpark';
    sendSmtpEmail.to = [{ email }];
    sendSmtpEmail.sender = { 
        email: process.env.BREVO_SENDER_EMAIL!, 
        name: process.env.BREVO_SENDER_NAME! 
    };
    
    const content = `
        <h2>Bonjour${userName ? ` ${userName}` : ''},</h2>
        <p>Nous avons reçu une demande de réinitialisation de mot de passe pour votre compte TeamSpark.</p>
        <p>Si vous êtes à l'origine de cette demande, veuillez cliquer sur le bouton ci-dessous pour créer un nouveau mot de passe :</p>
        <div style="text-align: center;">
            <a href="${resetLink}" class="button">Réinitialiser mon mot de passe</a>
        </div>
        <p>Si vous ne parvenez pas à cliquer sur le bouton, copiez et collez le lien suivant dans votre navigateur :</p>
        <p><a href="${resetLink}">${resetLink}</a></p>
        <p><strong>Ce lien expirera dans 1 heure.</strong></p>
        <p>Si vous n'avez pas demandé cette réinitialisation, vous pouvez ignorer cet e-mail. Votre mot de passe actuel restera inchangé.</p>
    `;
    
    sendSmtpEmail.htmlContent = baseTemplate(content, "Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet e-mail.");
    
    try {
        await api.sendTransacEmail(sendSmtpEmail);
        console.log(`Password reset email sent successfully to ${email}`);
    } catch (error) {
        console.error('Error sending password reset email:', error);
        throw new Error('Could not send password reset email.');
    }
}

// 3. E-mail de confirmation de réinitialisation de mot de passe
export async function sendPasswordResetConfirmationEmail(email: string, userName?: string) {
    const sendSmtpEmail = new Brevo.SendSmtpEmail();
    
    sendSmtpEmail.subject = 'Votre mot de passe a été modifié - TeamSpark';
    sendSmtpEmail.to = [{ email }];
    sendSmtpEmail.sender = { 
        email: process.env.BREVO_SENDER_EMAIL!, 
        name: process.env.BREVO_SENDER_NAME! 
    };
    
    const content = `
        <h2>Bonjour${userName ? ` ${userName}` : ''},</h2>
        <p>Nous vous confirmons que le mot de passe de votre compte TeamSpark a été modifié avec succès.</p>
        <p>Si vous êtes à l'origine de ce changement, vous n'avez rien d'autre à faire.</p>
        <p>Si vous n'avez pas modifié votre mot de passe, veuillez <a href="${process.env.BETTER_AUTH_URL}/contact">nous contacter</a> immédiatement.</p>
    `;
    
    sendSmtpEmail.htmlContent = baseTemplate(content);
    
    try {
        await api.sendTransacEmail(sendSmtpEmail);
        console.log(`Password reset confirmation email sent successfully to ${email}`);
    } catch (error) {
        console.error('Error sending password reset confirmation email:', error);
        throw new Error('Could not send password reset confirmation email.');
    }
}

// 4. E-mail d'invitation à rejoindre une équipe
export async function sendTeamInvitationEmail(
    email: string, 
    invitationLink: string, 
    teamName: string, 
    invitedByName: string,
    userName?: string
) {
    const sendSmtpEmail = new Brevo.SendSmtpEmail();
    
    sendSmtpEmail.subject = `Invitation à rejoindre l'équipe "${teamName}" - TeamSpark`;
    sendSmtpEmail.to = [{ email }];
    sendSmtpEmail.sender = { 
        email: process.env.BREVO_SENDER_EMAIL!, 
        name: process.env.BREVO_SENDER_NAME! 
    };
    
    const content = `
        <h2>Bonjour${userName ? ` ${userName}` : ''},</h2>
        <p>${invitedByName} vous a invité(e) à rejoindre l'équipe <strong>"${teamName}"</strong> sur TeamSpark.</p>
        <p>TeamSpark est une plateforme de collaboration qui vous permet de travailler efficacement avec votre équipe.</p>
        <p>Pour accepter cette invitation, veuillez cliquer sur le bouton ci-dessous :</p>
        <div style="text-align: center;">
            <a href="${invitationLink}" class="button">Rejoindre l'équipe</a>
        </div>
        <p>Si vous ne parvenez pas à cliquer sur le bouton, copiez et collez le lien suivant dans votre navigateur :</p>
        <p><a href="${invitationLink}">${invitationLink}</a></p>
        <p>Si vous n'avez pas de compte TeamSpark, vous serez invité(e) à en créer un lors de l'acceptation de l'invitation.</p>
    `;
    
    sendSmtpEmail.htmlContent = baseTemplate(content);
    
    try {
        await api.sendTransacEmail(sendSmtpEmail);
        console.log(`Team invitation email sent successfully to ${email}`);
    } catch (error) {
        console.error('Error sending team invitation email:', error);
        throw new Error('Could not send team invitation email.');
    }
}

// 5. E-mail de bienvenue après vérification
export async function sendWelcomeEmail(email: string, userName?: string) {
    const sendSmtpEmail = new Brevo.SendSmtpEmail();
    
    sendSmtpEmail.subject = 'Bienvenue sur TeamSpark !';
    sendSmtpEmail.to = [{ email }];
    sendSmtpEmail.sender = { 
        email: process.env.BREVO_SENDER_EMAIL!, 
        name: process.env.BREVO_SENDER_NAME! 
    };
    
    const content = `
        <h2>Bienvenue${userName ? ` ${userName}` : ''} !</h2>
        <p>Félicitations ! Votre adresse e-mail a été vérifiée avec succès et votre compte TeamSpark est maintenant actif.</p>
        <p>Vous pouvez maintenant :</p>
        <ul>
            <li>Créer et rejoindre des équipes</li>
            <li>Collaborer sur des projets</li>
            <li>Gérer vos tâches et échéances</li>
            <li>Communiquer avec vos collègues</li>
        </ul>
        <p><a href="${process.env.BETTER_AUTH_URL}/dashboard" class="button">Accéder à mon tableau de bord</a></p>
        <p>Si vous avez des questions, n'hésitez pas à consulter notre <a href="${process.env.BETTER_AUTH_URL}/help">centre d'aide</a> ou à <a href="${process.env.BETTER_AUTH_URL}/contact">nous contacter</a>.</p>
    `;
    
    sendSmtpEmail.htmlContent = baseTemplate(content);
    
    try {
        await api.sendTransacEmail(sendSmtpEmail);
        console.log(`Welcome email sent successfully to ${email}`);
    } catch (error) {
        console.error('Error sending welcome email:', error);
        throw new Error('Could not send welcome email.');
    }
}