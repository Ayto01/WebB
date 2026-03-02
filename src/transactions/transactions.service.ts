import { Injectable, NotFoundException } from "@nestjs/common";
import { and, eq } from "drizzle-orm";
import { InjectDrizzle } from "../drizzle/drizzle.provider";
import type { DatabaseProvider } from "../drizzle/drizzle.provider";
import { appointments, transactions } from "../drizzle/schema";
import { CreateTransactionDto, UpdateTransactionDto } from "./transaction.dto";
import { PaginationQuery } from "../common/pagination.dto";
import type { Session } from "../types/auth";
import { Role } from "../auth/roles";

@Injectable()
export class TransactionsService {
  constructor(@InjectDrizzle() private readonly db: DatabaseProvider) {}

  private isAdmin(user: Session) {
    return user.roles?.includes(Role.ADMIN);
  }

  async getAll({ page = 1, limit = 10 }: PaginationQuery, user: Session) {
    const offset = (page - 1) * limit;

    const items = await this.db.query.transactions.findMany({
      columns: {
        id: true,
        amount: true,
        date: true,
        method: true,
      },
      with: {
        user: {
          columns: { id: true, name: true, email: true },
        },
        appointment: true,
      },
      where: this.isAdmin(user) ? undefined : eq(transactions.userId, user.id),
      limit,
      offset,
    });

    return { items };
  }

  async getById(id: number, user: Session) {
    const transaction = await this.db.query.transactions.findFirst({
      where: this.isAdmin(user)
        ? eq(transactions.id, id)
        : and(eq(transactions.id, id), eq(transactions.userId, user.id)),
      with: {
        user: { columns: { id: true, name: true, email: true } },
        appointment: true,
      },
    });

    if (!transaction) throw new NotFoundException("Transaction not found");
    return transaction;
  }

  async create(dto: CreateTransactionDto, user: Session) {
    return this.db.transaction(async (tx) => {
      const appt = await tx.query.appointments.findFirst({
        where: eq(appointments.id, dto.appointment_id),
        columns: { id: true, customerId: true },
      });

      if (!appt)
        throw new NotFoundException("No appointment with this id exists");
      if (!this.isAdmin(user) && appt.customerId !== user.id) {
        throw new NotFoundException("No appointment with this id exists");
      }

      const [newTx] = await tx
        .insert(transactions)
        .values({
          amount: dto.amount,
          method: dto.method,
          date: new Date(dto.date),
          userId: user.id,
          appointmentId: dto.appointment_id,
        })
        .$returningId();

      await tx
        .update(appointments)
        .set({ status: "completed" })
        .where(eq(appointments.id, dto.appointment_id));

      const created = await tx.query.transactions.findFirst({
        where: eq(transactions.id, newTx.id),
        with: {
          user: { columns: { id: true, name: true, email: true } },
          appointment: true,
        },
      });

      if (!created) throw new NotFoundException("Transaction not found");
      return created;
    });
  }

  async deleteById(id: number, user: Session): Promise<void> {
    const existing = await this.db.query.transactions.findFirst({
      where: this.isAdmin(user)
        ? eq(transactions.id, id)
        : and(eq(transactions.id, id), eq(transactions.userId, user.id)),
    });

    if (!existing) {
      throw new NotFoundException("No transaction with this id exists");
    }

    await this.db.delete(transactions).where(eq(transactions.id, id));
  }

  async updateById(id: number, dto: UpdateTransactionDto, user: Session) {
    const existing = await this.db.query.transactions.findFirst({
      where: this.isAdmin(user)
        ? eq(transactions.id, id)
        : and(eq(transactions.id, id), eq(transactions.userId, user.id)),
    });

    if (!existing) {
      throw new NotFoundException("No transaction with this id exists");
    }

    const setData: Partial<typeof transactions.$inferInsert> = {
      ...(dto.amount !== undefined ? { amount: dto.amount } : {}),
      ...(dto.date !== undefined ? { date: new Date(dto.date) } : {}),
      ...(dto.method !== undefined ? { method: dto.method } : {}),
      ...(dto.appointment_id !== undefined
        ? { appointmentId: dto.appointment_id }
        : {}),
    };

    await this.db
      .update(transactions)
      .set(setData)
      .where(eq(transactions.id, id));
    return this.getById(id, user);
  }
}
