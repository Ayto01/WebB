import { ApiProperty } from "@nestjs/swagger";
import {
  IsDateString,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
} from "class-validator";
import { PartialType } from "@nestjs/mapped-types";

export class CreateTransactionDto {
  @ApiProperty({ example: 200, description: "Transaction amount" })
  @IsNumber()
  amount: number;

  @ApiProperty({
    example: "2025-12-16T10:00:00.000Z",
    description: "ISO date string",
  })
  @IsDateString()
  date: string;

  @ApiProperty({
    example: "cash",
    enum: ["cash", "online"],
    description: "Payment method",
  })
  @IsIn(["cash", "online"])
  method: "cash" | "online";

  @ApiProperty({ example: 1, description: "Appointment id" })
  @IsInt()
  appointment_id: number;
}

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
  @IsOptional()
  amount?: number;

  @IsOptional()
  date?: string;

  @IsOptional()
  method?: "cash" | "online";

  @IsOptional()
  appointment_id?: number;
}
