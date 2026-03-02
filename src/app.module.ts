import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { HealthController } from "./health/health.controller";
import { ServicesModule } from "./services/services.module";
import { UsersModule } from "./users/users.module";
import { WorkHoursModule } from "./work-hours/work-hours.module";
import { TimeOffModule } from "./time-off/time-off.module";
import { AppointmentsModule } from "./appointments/appointments.module";
import { HealthModule } from "./health/health.module";
import { ConfigModule } from "@nestjs/config";
import configuration from "./config/configuration";
import { TransactionsModule } from "./transactions/transactions.module";
import { MiddlewareConsumer, NestModule } from "@nestjs/common";
import { LoggerMiddleware } from "./lib/logger.middleware";
import { AuthModule } from "./auth/auth.module";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth/guards/auth.guard";
import { RolesGuard } from "./auth/guards/roles.guard";
import { AppService } from "./app.service";
import { SessionModule } from "./session/session.module";
import { AvailabilityModule } from "./availability/availability.module";

@Module({
  imports: [
    ServicesModule,
    UsersModule,
    WorkHoursModule,
    AvailabilityModule,
    TimeOffModule,
    AppointmentsModule,
    HealthModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TransactionsModule,
    AuthModule,
    SessionModule,
  ],
  controllers: [AppController, HealthController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
