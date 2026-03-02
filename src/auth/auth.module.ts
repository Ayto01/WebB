import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { AuthService } from "./auth.service";
import { DrizzleModule } from "../drizzle/drizzle.module";
import type { ServerConfig, AuthConfig } from "../config/configuration";

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory: (configService: ConfigService<ServerConfig>) => {
        const authConfig = configService.get<AuthConfig>("auth")!;
        return {
          secret: authConfig.jwt.secret,
          signOptions: {
            expiresIn: `${authConfig.jwt.expirationInterval}s`,
            audience: authConfig.jwt.audience,
            issuer: authConfig.jwt.issuer,
          },
        };
      },
    }),
    DrizzleModule,
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
