import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Enable cookie parser
  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties that don't have decorators
      transform: true, // Transform payloads to DTO instances
      forbidNonWhitelisted: true, // Throw errors if non-whitelisted properties are present
    }),
  );

  // Enable CORS
  app.enableCors({
    origin: [
      //add the urls that are allowed to access the api
      'http://localhost:3000',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });
  // configure swagger api documentation

  const config = new DocumentBuilder()
    .setTitle('Backend Assessment API')
    .setDescription(
      'The BuySimply Backend Task Management System Assessment API',
    )
    .setVersion('1.0')
    .addTag('Task Management System API')
    .addApiKey(
      {
        type: 'apiKey',
        name: 'x-api-key',
        in: 'header',
        description: 'API key for authentication',
      },
      'x-api-key',
    )
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger/api', app, documentFactory, {
    jsonDocumentUrl: '/swagger/api-json',
  });

  app.setGlobalPrefix('/api');

  // Get the DataSource to check connection
  const dataSource = app.get(DataSource);

  if (dataSource.isInitialized) {
    console.log('Database connected successfully!');
    console.log(`Connected to database: ${dataSource.options.database}`);
  } else {
    console.log('Database connection failed!');
  }

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
