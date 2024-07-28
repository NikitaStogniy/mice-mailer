import { Controller, Get, Post, Render } from '@nestjs/common';
import * as clientTemplateFixture from '../../fixtures/client.json';
import * as hotelTemplateFixture from '../../fixtures/hotel.json';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('dev')
export class DevController {
  constructor(
    private readonly mailerService: MailerService,
  ) {}

  @Post('hotel')
  sendTestHotelEmail() {
    const email = process.env.TEST_EMAIL_TO;
    this.mailerService
      .sendMail({
        to: process.env.TEST_EMAIL_TO,
        from: process.env.EMAIL_ID,
        subject: 'Информация об отеле',
        template: 'hotel',
        context: {
            ...hotelTemplateFixture
          },
        },
      )
      .then((success) => {
        const message = `Email sent successfully to ${email}`
        console.log(message);
        return { message }
      })
      .catch((err) => {
        const message = `Failed to send email to ${email}: ${err}`
        console.log(message);
        return { message }
      });
  }

  @Post('client')
  sendTestClientEmail() {
    const email = process.env.TEST_EMAIL_TO;
    this.mailerService
      .sendMail({
          to: process.env.TEST_EMAIL_TO,
          from: process.env.EMAIL_ID,
          subject: 'Информация о клиенте',
          template: 'client',
          context: {
            ...clientTemplateFixture
          },
        },
      )
      .then((success) => {
        const message = `Email sent successfully to ${email}`
        console.log(message);
        return { message }
      })
      .catch((err) => {
        const message = `Failed to send email to ${email}: ${err}`
        console.log(message);
        return { message }
      });
  }

  @Get('client/html')
  @Render('client')
  getTestClientHtml() {
    return clientTemplateFixture;
  }

  @Get('hotel/html')
  @Render('hotel')
  getTestHotelHtml() {
    return hotelTemplateFixture;
  }
}
