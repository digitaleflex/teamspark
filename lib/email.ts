import * as Brevo from '@getbrevo/brevo';

const api = new Brevo.TransactionalEmailsApi();

api.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY!);

export async function sendVerificationEmail(email: string, link: string) {
  const sendSmtpEmail = new Brevo.SendSmtpEmail();

  sendSmtpEmail.subject = 'Vérifiez votre adresse e-mail';
  sendSmtpEmail.to = [{ email }];
  sendSmtpEmail.htmlContent = `<html><body><h1>Vérifiez votre adresse e-mail</h1><p>Cliquez sur le lien ci-dessous pour vérifier votre adresse e-mail.</p><a href="${link}">Vérifier l'e-mail</a></body></html>`;
  sendSmtpEmail.sender = { email: process.env.BREVO_SENDER_EMAIL!, name: process.env.BREVO_SENDER_NAME! };

  try {
    await api.sendTransacEmail(sendSmtpEmail);
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Could not send verification email.');
  }
}
