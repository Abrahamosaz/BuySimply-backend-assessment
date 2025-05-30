import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

interface EmailOptions {
  to: string;
  subject: string;
  template: string; // this is the template name
  context?: any;
}

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(options: EmailOptions) {
    try {
      await this.mailerService.sendMail({
        to: options.to,
        subject: options.subject,
        template: options.template,
        context: options.context || {},
      });
    } catch (err) {
      console.log('error sending mail', err);
    }
  }
}
