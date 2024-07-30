import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as hbs from 'express-handlebars';
import * as Handlebars from 'handlebars';
import './handlebarsHelpers';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: false,
    helpers: Handlebars.helpers
  }));
  app.setViewEngine('hbs');
  app.setBaseViewsDir(join(__dirname, '../..', 'views'));

  await app.listen(3000);
}
bootstrap();
