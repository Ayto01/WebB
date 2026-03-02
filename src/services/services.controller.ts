import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { ServicesService } from "./services.service";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";
import { Public } from "../auth/decorators/public.decorator";
import { PaginationQuery } from "../common/pagination.dto";

@Controller("services")
export class ServicesController {
  constructor(private readonly services: ServicesService) {}

  @Get()
  @Public()
  async findAll(@Query() pagination: PaginationQuery) {
    return this.services.findAll(pagination);
  }

  @Get(":id")
  @Public()
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return this.services.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateServiceDto) {
    return this.services.create(dto);
  }

  @Put(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateServiceDto,
  ) {
    return this.services.update(id, dto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param("id", ParseIntPipe) id: number) {
    await this.services.remove(id);
  }
}
