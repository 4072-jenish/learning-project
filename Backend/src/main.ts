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
        "http://localhost:5173",
        "http://localhost:3000",
        "https://public-blog-web.vercel.app",
        "https://midiator-penal.vercel.app",
        "https://blog-admin-panel-rho.vercel.app/"
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
