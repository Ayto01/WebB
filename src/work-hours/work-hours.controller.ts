import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import { WorkHoursService } from "./work-hours.service";
import { CreateWorkHourDto } from "./dto/create-work-hour.dto";
import { UpdateWorkHourDto } from "./dto/update-work-hour.dto";

@Controller("work-hours")
export class WorkHoursController {
  constructor(private readonly svc: WorkHoursService) {}
  @Get() findAll() {
    return this.svc.findAll();
  }
  @Get(":id") findOne(@Param("id", ParseIntPipe) id: number) {
    return this.svc.findOne(id);
  }
  @Post() create(@Body() dto: CreateWorkHourDto) {
    return this.svc.create(dto);
  }
  @Put(":id") update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateWorkHourDto,
  ) {
    return this.svc.update(id, dto);
  }
  @Delete(":id") remove(@Param("id", ParseIntPipe) id: number) {
    this.svc.remove(id);
    return { message: "deleted" };
  }
}
