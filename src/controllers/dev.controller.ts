import { Controller, Get, Header, Post, Render, Res } from '@nestjs/common';
import * as clientTemplateFixture from '../../fixtures/client.json';
import * as hotelTemplateFixture from '../../fixtures/hotel.json';
import { MailerService } from '@nestjs-modules/mailer';
import { PdfService } from '../services/pdf.service';
import { HandlebarsService } from '../services/handlebars.service';
import { Response } from 'express';

@Controller('dev')
export class DevController {
  constructor(
    private readonly mailerService: MailerService,
    private readonly pdfService: PdfService,
    private readonly handlebarsService: HandlebarsService,
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

  @Get('hotel/pdf')
  // @Header('Content-Type', 'application/pdf')
  // @Header('Content-Disposition', 'attachment; filename=output.pdf')
  async getTestHotelPdf(@Res() res: Response) {
    const htmlContent = await this.handlebarsService.renderTemplate('hotel', hotelTemplateFixture);
    await this.pdfService.generatePdf(htmlContent);
    return 'ok';
    // res.send(pdfBuffer);
  }
}
