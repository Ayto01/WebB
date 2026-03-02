/* eslint-disable prettier/prettier */
import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus
} from "@nestjs/common";
import type { Response } from "express";

interface HttpExceptionResponse {
  statusCode: number;
  timestamp: string;
  message: string;
  details?: object | null;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
   

    const status = exception.getStatus?.() ?? HttpStatus.INTERNAL_SERVER_ERROR;
    const exceptionResponse = exception.getResponse();

    let message = exception.message;
    let details: object | null = null;


    if (typeof exceptionResponse === "object" && exceptionResponse !== null) {
      const res = exceptionResponse as Record<string, unknown>;

      if (typeof res.message === "string") {
        message = res.message;
      }

      if (typeof res.details === "object" && res.details !== null) {
        details = res.details;
      }
    }

    const body: HttpExceptionResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      message,
      details,
    };



   
    response.status(status).json(body);
  }
}
