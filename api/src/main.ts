import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { AtGuard } from './modules/common/guards';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  /**
   * simulate dependecy injection when isPublic is on route's metadata:
   * alternative would setting it in providers in auth.module.ts
    const reflector = new Reflector();
    app.useGlobalGuards(new AtGuard(reflector));
  */

  await app.listen(parseInt(process.env.PORT || '3000'));
}

bootstrap();
