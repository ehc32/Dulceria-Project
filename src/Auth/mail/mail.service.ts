import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'xzenzi259@gmail.com',
        pass: 'pquw hlrm aooj cvcv',
      },
    });
  }

  async sendResetCode(to: string, code: string) {
    await this.transporter.sendMail({
      from: `"Mi App" <xzenzi259@gmail.com>`,
      to,
      subject: 'Código de recuperación de contraseña',
      text: `Tu código es: ${code}`,
      html: `<p>Tu código de recuperación es: <strong>${code}</strong></p>`,
    });
  }
}
