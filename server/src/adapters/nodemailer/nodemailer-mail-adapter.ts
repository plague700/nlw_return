import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapters";

const transport = nodemailer.createTransport({
  host: `${process.env.NODEMAILER_HOST}`,
  port: 2525,
  auth: {
    user: `${process.env.NODEMAILER_USER}`,
    pass: `${process.env.NODEMAILER_PASS}`
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  
  // Envio do email
  async sendMail({subject, body}: SendMailData){

    await transport.sendMail({
      from: 'Equipe feedget <oi@feedget.com>',
      to: `${process.env.NAME_EMAIL_DESTINATION || "Plague700"} <${process.env.EMAIL_DESTINATION || "batata@gmail.com"}>`,
      subject,
      html: body
    });

  }

}