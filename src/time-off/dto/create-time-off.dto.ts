import { IsISO8601, IsOptional, IsString } from "class-validator";

export class CreateTimeOffDto {
  @IsISO8601() start_at: string; // "2025-10-20T13:00:00+02:00"
  @IsISO8601() end_at: string;
  @IsOptional() @IsString() reason?: string;
}
