import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapters";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "889daacaefbbb8",
    pass: "313a2623d387cf"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  
  // Envio do email
  async sendMail({subject, body}: SendMailData){

    await transport.sendMail({
      from: 'Equipe feedget <oi@feedget.com>',
      to: 'Marcus Braga <batata@gmail.com>',
      subject,
      html: body
    });

  }

}