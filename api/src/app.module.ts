import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmConfig } from './utils/typeorm';
import { modules } from './utils/modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRoot({ ...TypeOrmConfig }),
    ...modules,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
