import { ApiProperty } from "@nestjs/swagger";

class PublicUserDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: "Thomas Aelbrecht" })
  name: string;

  @ApiProperty({ example: "thomas.aelbrecht@hogent.be" })
  email: string;
}

class AppointmentDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: "confirmed" })
  status: string;

  @ApiProperty({ example: "2025-01-02T09:00:00.000Z" })
  startAt: string;

  @ApiProperty({ example: "2025-01-02T09:30:00.000Z" })
  endAt: string;
}

export class TransactionResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 200 })
  amount: number;

  @ApiProperty({ example: "cash", enum: ["cash", "online"] })
  method: "cash" | "online";

  @ApiProperty({ example: "2025-01-02T09:35:00.000Z" })
  date: string;

  @ApiProperty({ type: () => PublicUserDto })
  user: PublicUserDto;

  @ApiProperty({ type: () => AppointmentDto })
  appointment: AppointmentDto;
}

export class TransactionListResponseDto {
  @ApiProperty({ type: () => [TransactionResponseDto] })
  items: TransactionResponseDto[];
}
