import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Eliminar campos no definidos en DTOs
    forbidNonWhitelisted: true, // Rechazar peticiones con campos no definidos en DTOs
    transform: true, // Habilitar la transformación de datos recibidos
  }));
  await app.listen(3000);
}
bootstrap();
