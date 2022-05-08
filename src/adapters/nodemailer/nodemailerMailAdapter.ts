import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from '../mailAdapter';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "044099c943a4aa",
    pass: "118bdef6895e83"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ body,subject }: SendMailData) {

    await transport.sendMail({
    from: 'Equipe Feedget <oi@feedget.com>',
    to: 'Jackson Honoro <jackson.honoro@gmail.com>',
    subject,
    html: body,
  });
  };

}