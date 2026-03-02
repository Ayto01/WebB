import { Controller, Get, Query, BadRequestException } from "@nestjs/common";
import { AvailabilityService } from "src/availability/availability.service";

@Controller("availability")
export class AvailabilityController {
  constructor(private readonly availability: AvailabilityService) {}

  @Get()
  async get(
    @Query("date") date: string,
    @Query("service_id") serviceId: string,
  ) {
    if (!date) throw new BadRequestException("date is required");
    if (!serviceId) throw new BadRequestException("service_id is required");

    const serviceIdNum = Number(serviceId);
    if (!Number.isInteger(serviceIdNum)) {
      throw new BadRequestException("service_id must be an integer");
    }

    return {
      items: await this.availability.getAvailableSlots(date, serviceIdNum),
    };
  }
}
