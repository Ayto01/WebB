import {
  mysqlTable,
  int,
  varchar,
  datetime,
  time,
  mysqlEnum,
  uniqueIndex,
  primaryKey,
  json,
} from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";

export const userFavoriteServices = mysqlTable(
  "user_favorite_services",
  {
    userId: int("user_id", { unsigned: true })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    serviceId: int("service_id", { unsigned: true })
      .notNull()
      .references(() => services.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.userId, t.serviceId] })],
);

export const users = mysqlTable(
  "users",
  {
    id: int("id", { unsigned: true }).primaryKey().autoincrement(),
    name: varchar("name", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 20 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    passwordHash: varchar("password_hash", { length: 255 }).notNull(),
    roles: json("roles").notNull(),
  },
  (table) => [uniqueIndex("idx_user_email_unique").on(table.email)],
);

export const services = mysqlTable("services", {
  id: int("id", { unsigned: true }).primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),

  durationService: int("duration_service", { unsigned: true }).notNull(),

  price: int("price", { unsigned: true }).notNull(),
});

export const appointments = mysqlTable("appointments", {
  id: int("id", { unsigned: true }).primaryKey().autoincrement(),

  customerId: int("customer_id", { unsigned: true })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  serviceId: int("service_id", { unsigned: true })
    .notNull()
    .references(() => services.id, { onDelete: "restrict" }),

  startAt: datetime("start_at").notNull(),
  endAt: datetime("end_at").notNull(),

  status: mysqlEnum("status", [
    "pending",
    "confirmed",
    "cancelled",
    "completed",
  ])
    .notNull()
    .default("pending"),
});

export const workHours = mysqlTable("work_hours", {
  id: int("id", { unsigned: true }).primaryKey().autoincrement(),

  weekday: int("weekday", { unsigned: true }).notNull(),

  startTime: time("start_time").notNull(),
  endTime: time("end_time").notNull(),
});

export const timeOff = mysqlTable("time_off", {
  id: int("id", { unsigned: true }).primaryKey().autoincrement(),

  startAt: datetime("start_at").notNull(),
  endAt: datetime("end_at").notNull(),

  reason: varchar("reason", { length: 255 }).notNull(),
});

export const transactions = mysqlTable(
  "transactions",
  {
    id: int("id", { unsigned: true }).primaryKey().autoincrement(),

    amount: int("amount", { unsigned: true }).notNull(),
    date: datetime("date").notNull(),

    method: mysqlEnum("method", ["cash", "online"]).notNull(),

    userId: int("user_id", { unsigned: true })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),

    appointmentId: int("appointment_id", { unsigned: true })
      .notNull()
      .references(() => appointments.id, { onDelete: "cascade" }),
  },
  (table) => [
    uniqueIndex("idx_transactions_appointment_unique").on(table.appointmentId),
  ],
);

export const usersRelations = relations(users, ({ many }) => ({
  appointments: many(appointments),
  transactions: many(transactions),
}));

export const servicesRelations = relations(services, ({ many }) => ({
  appointments: many(appointments),
}));

export const appointmentsRelations = relations(appointments, ({ one }) => ({
  transaction: one(transactions, {
    fields: [appointments.id],
    references: [transactions.appointmentId],
  }),
  user: one(users, {
    fields: [appointments.customerId],
    references: [users.id],
  }),
  service: one(services, {
    fields: [appointments.serviceId],
    references: [services.id],
  }),
}));

export const transactionsRelations = relations(transactions, ({ one }) => ({
  user: one(users, {
    fields: [transactions.userId],
    references: [users.id],
  }),
  appointment: one(appointments, {
    fields: [transactions.appointmentId],
    references: [appointments.id],
  }),
}));

export const userFavoriteServicesRelations = relations(
  userFavoriteServices,
  ({ one }) => ({
    service: one(services, {
      fields: [userFavoriteServices.serviceId],
      references: [services.id],
    }),
  }),
);
