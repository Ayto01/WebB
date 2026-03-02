import {
  BadRequestException,
  Logger,
  ValidationError,
  ValidationPipe,
} from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import type {
  CorsConfig,
  LogConfig,
  ServerConfig,
} from "./config/configuration";
import CustomLogger from "./core/customLogger";
import { HttpExceptionFilter } from "./core/http-exception.filter";
import { DrizzleQueryErrorFilter } from "./drizzle/drizzle-query-error.filter";
import helmet from "helmet";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: process.env.LOG_DISABLED === "true" ? false : undefined,
  });

  const config = app.get<ConfigService<ServerConfig>>(ConfigService);

  const log = config.get<LogConfig>("log");
  if (!log?.disabled) {
    app.useLogger(
      new CustomLogger({
        logLevels: log?.levels ?? ["log", "error", "warn"],
      }),
    );
  }

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

  const cors = config.get<CorsConfig>("cors");
  app.enableCors({
    origin: cors?.origins ?? [],
    maxAge: cors?.maxAge,
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle("Budget Web Services")
    .setDescription("The Budget API application")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("docs", app, document);

  const port = config.get<number>("port") ?? 3000;
  await app.listen(port);

  new Logger().log(`🚀 Server listening on http://127.0.0.1:${port}/api`);
}

void bootstrap();
