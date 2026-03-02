import { IsInt, Min, Max, Matches } from "class-validator";

export class CreateWorkHourDto {
  @IsInt()
  @Min(0)
  @Max(6)
  weekday: number;

  @Matches(/^\d{2}:\d{2}$/)
  start_time: string;

  @Matches(/^\d{2}:\d{2}$/)
  end_time: string;
}
