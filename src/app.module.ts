require('dotenv').config()

import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { DevController } from './controllers/dev.controller';
import { AppService } from './services/app.service';
import { PdfService } from './services/pdf.service';
import { HandlebarsService } from './services/handlebars.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
          user: process.env.EMAIL_ID,
          pass: process.env.EMAIL_PASS
        },
      },
      defaults: {
        from: '"nest-modules" <user@outlook.com>',
      },
      template: {
        dir: `${process.cwd()}/views/`,
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [
    AppController,
    ...(process.env.NODE_ENV === 'development' ? [DevController] : []),
  ],
  providers: [AppService, PdfService, HandlebarsService],
})
export class AppModule { }
