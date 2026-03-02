import { Injectable, NotFoundException } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { InjectDrizzle } from "../drizzle/drizzle.provider";
import type { DatabaseProvider } from "../drizzle/drizzle.provider";
import { services } from "../drizzle/schema";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";
import type { PaginationQuery } from "../common/pagination.dto";

@Injectable()
export class ServicesService {
  constructor(@InjectDrizzle() private readonly db: DatabaseProvider) {}

  private toApi(row: any) {
    return {
      id: row.id,
      name: row.name,
      duration_min: row.durationService,
      price: row.price,
      created_at: row.createdAt ?? row.created_at ?? null,
    };
  }

  async findAll({ page = 1, limit = 10 }: PaginationQuery) {
    const offset = (page - 1) * limit;

    const rows = await this.db.query.services.findMany({
      limit,
      offset,
    });

    return { items: rows.map((r) => this.toApi(r)) };
  }

  async findOne(id: number) {
    const row = await this.db.query.services.findFirst({
      where: eq(services.id, id),
    });
    if (!row) throw new NotFoundException("Service not found");
    return this.toApi(row);
  }

  async create(dto: CreateServiceDto) {
    const [created] = await this.db
      .insert(services)
      .values({
        name: dto.name,
        durationService: dto.duration_min,
        price: dto.price,
      })
      .$returningId();

    return this.findOne(created.id);
  }

  async update(id: number, dto: UpdateServiceDto) {
    const existing = await this.db.query.services.findFirst({
      where: eq(services.id, id),
    });
    if (!existing) throw new NotFoundException("Service not found");

    await this.db
      .update(services)
      .set({
        ...(dto.name !== undefined ? { name: dto.name } : {}),
        ...(dto.duration_min !== undefined
          ? { durationService: dto.duration_min }
          : {}),
        ...(dto.price !== undefined ? { price: dto.price } : {}),
      })
      .where(eq(services.id, id));

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const existing = await this.db.query.services.findFirst({
      where: eq(services.id, id),
    });
    if (!existing) throw new NotFoundException("Service not found");

    await this.db.delete(services).where(eq(services.id, id));
  }
}
