import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const appOptions = { cors: true };
  const app = await NestFactory.create(AppModule, appOptions);
  console.log('bootstrap -> process.env.BASE_PATH', process.env.PORT);
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
