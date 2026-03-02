import type { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import { Catch, HttpException, Logger } from "@nestjs/common";
import type { Response } from "express";

interface HttpExceptionResponse {
  statusCode: number;
  timestamp: string;
  message: string;
  details?: object | null;
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const responseBody: HttpExceptionResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: exception.message,
      details: null,
    };

    const exceptionResponse: unknown = exception.getResponse();

    if (isRecord(exceptionResponse)) {
      const msg = exceptionResponse["message"];
      const det = exceptionResponse["details"];

      if (typeof msg === "string") responseBody.message = msg;
      if (isRecord(det)) responseBody.details = det;
    }

    new Logger("HttpExceptionFilter").error(
      `HTTP Exception: ${JSON.stringify(responseBody)}`,
    );

    response.status(status).json(responseBody);
  }
}
