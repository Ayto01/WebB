/* eslint-disable prettier/prettier */
import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { delay } from "rxjs/operators";
import type { ServerConfig, AuthConfig } from "../../config/configuration";

@Injectable()
export class AuthDelayInterceptor implements NestInterceptor {
  constructor(private configService: ConfigService<ServerConfig>) {}

  intercept(_: ExecutionContext, next: CallHandler) {
    const auth = this.configService.get<AuthConfig>("auth")!;
    const maxDelay = auth.maxDelay ?? 0;

    const randomDelay = Math.round(Math.random() * maxDelay);
    return next.handle().pipe(delay(randomDelay));
  }
}
