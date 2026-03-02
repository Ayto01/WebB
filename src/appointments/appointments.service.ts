import { Injectable, NotFoundException } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { InjectDrizzle } from "../drizzle/drizzle.provider";
import type { DatabaseProvider } from "../drizzle/drizzle.provider";
import * as schema from "../drizzle/schema";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
import { UpdateAppointmentDto } from "./dto/update-appointment.dto";

@Injectable()
export class AppointmentsService {
  constructor(@InjectDrizzle() private readonly db: DatabaseProvider) {}

  async findAll() {
    return this.db.query.appointments.findMany({
      with: {
        user: {
          columns: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        service: true,
        transaction: {
          columns: {
            id: true,
            amount: true,
            date: true,
            method: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const appointment = await this.db.query.appointments.findFirst({
      where: eq(schema.appointments.id, id),
      with: {
        user: {
          columns: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        service: true,
        transaction: {
          columns: {
            id: true,
            amount: true,
            date: true,
            method: true,
          },
        },
      },
    });

    if (!appointment) {
      throw new NotFoundException("Appointment not found");
    }

    return appointment;
  }

  async create(dto: CreateAppointmentDto) {
    const [res] = await this.db
      .insert(schema.appointments)
      .values({
        customerId: dto.customer_id,
        serviceId: dto.service_id,
        startAt: new Date(dto.start_at),
        endAt: new Date(dto.start_at),
        status: dto.status ?? "pending",
      })
      .$returningId();

    return this.findOne(res.id);
  }

  async update(id: number, dto: UpdateAppointmentDto) {
    const updateData: Partial<typeof schema.appointments.$inferInsert> = {};

    if (dto.customer_id !== undefined) updateData.customerId = dto.customer_id;
    if (dto.service_id !== undefined) updateData.serviceId = dto.service_id;
    if (dto.start_at !== undefined) {
      updateData.startAt = new Date(dto.start_at);
      updateData.endAt = new Date(dto.start_at);
    }
    if (dto.status !== undefined) updateData.status = dto.status;

    await this.db
      .update(schema.appointments)
      .set(updateData)
      .where(eq(schema.appointments.id, id));

    return this.findOne(id);
  }

  async remove(id: number) {
    await this.db
      .delete(schema.appointments)
      .where(eq(schema.appointments.id, id));
  }
}
