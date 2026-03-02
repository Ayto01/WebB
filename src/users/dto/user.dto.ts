import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class RegisterUserRequestDto {
  @ApiProperty({ example: "Ayto" })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  name: string;

  @ApiProperty({ example: "ayto@example.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "+32..." })
  @IsString()
  @MaxLength(20)
  phone: string;

  @ApiProperty({ example: "12345678" })
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password: string;
}

export class UpdateUserRequestDto {
  @ApiProperty({ example: "Ayto", required: false })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  name?: string;

  @ApiProperty({ example: "ayto@example.com", required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: "+32...", required: false })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;
}

export class PublicUserResponseDto {
  @Expose()
  @ApiProperty({ example: 1 })
  id: number;

  @Expose()
  @ApiProperty({ example: "Ayto" })
  name: string;

  @Expose()
  @ApiProperty({ example: "ayto@example.com" })
  email: string;

  @Expose()
  @ApiProperty({ example: "+32..." })
  phone: string;
}

export class UserListResponseDto {
  @ApiProperty({ type: () => [PublicUserResponseDto] })
  items: PublicUserResponseDto[];
}
