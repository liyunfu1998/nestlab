import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log('handler...');
    return this.appService.getHello();
  }

  @Get('aaa')
  getHello2(): string {
    console.log('log-handler');
    return this.appService.getHello();
  }
}
