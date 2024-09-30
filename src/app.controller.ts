import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginGuard } from './login.guard';
import { TimeInterceptor } from './time.interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log('handler...');
    return this.appService.getHello();
  }

  @Get('aaa')
  @UseGuards(LoginGuard)
  @UseInterceptors(TimeInterceptor)
  getHello2(): string {
    console.log('log-handler');
    return this.appService.getHello();
  }
}
