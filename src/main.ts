import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({}));
  app.enableCors({
    exposedHeaders: ['authorization', 'x-refresh-token'],
  });
  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder().setTitle('KickMetrics API').setVersion('1.0').build(),
  );
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
