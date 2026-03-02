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
import { TimeOffService } from "./time-off.service";
import { CreateTimeOffDto } from "./dto/create-time-off.dto";
import { UpdateTimeOffDto } from "./dto/update-time-off.dto";

@Controller("time-off")
export class TimeOffController {
  constructor(private readonly svc: TimeOffService) {}
  @Get() findAll() {
    return this.svc.findAll();
  }
  @Get(":id") findOne(@Param("id", ParseIntPipe) id: number) {
    return this.svc.findOne(id);
  }
  @Post() create(@Body() dto: CreateTimeOffDto) {
    return this.svc.create(dto);
  }
  @Put(":id") update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateTimeOffDto,
  ) {
    return this.svc.update(id, dto);
  }
  @Delete(":id") remove(@Param("id", ParseIntPipe) id: number) {
    this.svc.remove(id);
    return { message: "deleted" };
  }
}
