import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ErrorLogFilter } from './modules/error-log/error-log.filter';
import { ErrorLogService } from './modules/error-log/error-log.service';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Posts-RealTime')
    .setDescription('The post Api Description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  const errorLogsService = app.get(ErrorLogService);
  app.useGlobalFilters(new ErrorLogFilter(errorLogsService));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
