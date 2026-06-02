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
        "http://localhost:4321",
        "https://adminpanel-blogmenegment.vercel.app",
        "https://blog-managment-project.vercel.app"
      ],
      credentials: true,
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
