import { Injectable, NotFoundException } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { plainToInstance } from "class-transformer";

import {
  InjectDrizzle,
  type DatabaseProvider,
} from "../drizzle/drizzle.provider";
import { users } from "../drizzle/schema";

import type { PaginationQuery } from "../common/pagination.dto";
import type { UpdateUserRequestDto, UserListResponseDto } from "./dto/user.dto";
import { PublicUserResponseDto } from "./dto/user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectDrizzle()
    private readonly db: DatabaseProvider,
  ) {}

  private toPublic(user: unknown): PublicUserResponseDto {
    return plainToInstance(PublicUserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async getAll(pagination?: PaginationQuery): Promise<UserListResponseDto> {
    const page = pagination?.page ?? 1;
    const limit = pagination?.limit ?? 10;

    const offset = (page - 1) * limit;

    const list = await this.db.query.users.findMany({
      limit,
      offset,
    });

    return { items: list.map((u) => this.toPublic(u)) };
  }

  async getById(id: number): Promise<PublicUserResponseDto> {
    const user = await this.db.query.users.findFirst({
      where: eq(users.id, id),
    });

    if (!user) {
      throw new NotFoundException("No user with this id exists");
    }

    return this.toPublic(user);
  }

  async update(
    id: number,
    dto: UpdateUserRequestDto,
  ): Promise<PublicUserResponseDto> {
    const [result] = await this.db
      .update(users)
      .set({
        ...(dto.name !== undefined ? { name: dto.name } : {}),
        ...(dto.email !== undefined ? { email: dto.email } : {}),
        ...(dto.phone !== undefined ? { phone: dto.phone } : {}),
      })
      .where(eq(users.id, id));

    if (result.affectedRows === 0) {
      throw new NotFoundException("No user with this id exists");
    }

    return this.getById(id);
  }

  async delete(id: number): Promise<void> {
    const [result] = await this.db.delete(users).where(eq(users.id, id));

    if (result.affectedRows === 0) {
      throw new NotFoundException("No user with this id exists");
    }
  }
}
