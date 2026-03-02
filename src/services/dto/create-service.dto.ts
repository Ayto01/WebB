import { IsNumber, IsString, Min, MaxLength } from "class-validator";

export class CreateServiceDto {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsNumber()
  @Min(1)
  duration_min: number;

  @IsNumber()
  @Min(0)
  price: number;
}
