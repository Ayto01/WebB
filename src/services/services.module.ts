import { Module } from "@nestjs/common";
import { ServicesService } from "./services.service";
import { ServicesController } from "./services.controller";
import { DrizzleModule } from "../drizzle/drizzle.module";

@Module({
  imports: [DrizzleModule],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
