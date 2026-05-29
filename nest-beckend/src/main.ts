import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe(),
  );

  await app.startAllMicroservices();

  app.enableCors(
    {
      origin: [
        "https://admin-panel-blog-managment.vercel.app/",
        "https://blog-managment-project.vercel.app/"
      ],
      Credentials: true,
    },
)

  await app.listen(process.env.PORT ?? 8000);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
}

bootstrap();