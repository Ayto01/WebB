import { IsISO8601, IsInt, IsOptional, IsIn } from "class-validator";

export class CreateAppointmentDto {
  @IsInt()
  customer_id: number;

  @IsInt()
  service_id: number;

  @IsISO8601()
  start_at: string;

  @IsOptional()
  @IsIn(["pending", "confirmed", "cancelled"])
  status?: "pending" | "confirmed" | "cancelled";
}
