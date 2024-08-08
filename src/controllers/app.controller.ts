import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService
  ) {}

  @Get()
  getHello(): any {
    return this.appService.getHello();
  }

  @Post('email')
  sendTemplate(@Body() body: { id: string }): any {
    return this.appService.sendEmail({ id: body.id });
  }
}
