import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoginGuard } from './login.guard';
import { TimeInterceptor } from './time.interceptor';
import { TestFilter } from './test.filter';
import { WINSTON_LOGGER_TOKEN } from './winston/winston.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 使用自定义的日志
  app.useLogger(app.get(WINSTON_LOGGER_TOKEN));

  app.enableCors();
  // 自定义全局middleware
  app.use(function (req: Request, res: Response, next: NextFunction) {
    console.log('before', req.url);
    next();
    console.log('after');
  });

  // 全局路由守卫
  // app.useGlobalGuards(new LoginGuard());

  // 全局拦截器
  app.useGlobalInterceptors(new TimeInterceptor());

  // 全局过滤器
  app.useGlobalFilters(new TestFilter());
  // 启用全局验证管道
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // 启用 CORS
  app.enableCors();

  // 设置全局前缀
  app.setGlobalPrefix('api');

  // 配置静态文件目录
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.useStaticAssets(join(__dirname, '../uploads'), { prefix: '/uploads' });
  await app.listen(3000);
}
bootstrap();
