/* eslint-disable prettier/prettier */
import {
    INestApplication,
    ValidationPipe,
    BadRequestException,
} from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { ValidationError } from "class-validator";
import helmet from "helmet";

import { AppModule } from "../../src/app.module";
import { DrizzleQueryErrorFilter } from "../../src/drizzle/drizzle-query-error.filter";
import { HttpExceptionFilter } from "../../src/core/http-exception.filter";

export async function createTestApp(): Promise<INestApplication> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();

  // main.ts ile aynı
  app.use(helmet());
  app.setGlobalPrefix("api");

  app.useGlobalFilters(
    new DrizzleQueryErrorFilter(),
    new HttpExceptionFilter(),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[] = []) => {
        const formattedErrors = errors.reduce(
          (acc, err) => {
            acc[err.property] = Object.values(err.constraints ?? {});
            return acc;
          },
          {} as Record<string, string[]>,
        );

        return new BadRequestException({
          message: "Validation failed",
          details: { body: formattedErrors },
        });
      },
    }),
  );



  await app.init();
  return app;
}
