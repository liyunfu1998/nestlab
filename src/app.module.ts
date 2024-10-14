import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DbModule } from './db/db.module';
import { BookModule } from './book/book.module';
import { LogMiddleware } from './log.middleware';
import { APP_GUARD } from '@nestjs/core';
import { LoginGuard } from './login.guard';
import { WinstonModule } from './winston/winston.module';
import { format, transports } from 'winston';
import * as chalk from 'chalk';

@Module({
  imports: [
    WinstonModule.forRoot({
      level: 'debug',
      transports: [
        new transports.Console({
          format: format.combine(
            format.colorize(),
            format.printf(({ context, level, message, time }) => {
              const appStr = chalk.green(`[NEST]`);
              const contextStr = chalk.yellow(`[${context}]`);

              return `${appStr} ${time} ${level} ${contextStr} ${message} `;
            }),
          ),
        }),
        new transports.File({
          format: format.combine(format.timestamp(), format.json()),
          filename: 'combined.log',
          dirname: 'logs',
        }),
        new transports.File({
          format: format.combine(format.timestamp(), format.json()),
          filename: 'error.log',
          dirname: 'logs',
          level: 'error',
        }),
        new transports.File({
          format: format.combine(format.timestamp(), format.json()),
          filename: 'warn.log',
          dirname: 'logs',
          level: 'warn',
        }),
        new transports.File({
          format: format.combine(format.timestamp(), format.json()),
          filename: 'info.log',
          dirname: 'logs',
          level: 'info',
        }),
      ],
    }),
    UserModule,
    DbModule,
    BookModule,
    WinstonModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: LoginGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes('aaa*');
  }
}
