import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import * as mysql from "mysql2/promise";
import * as schema from "./schema";
import * as argon2 from "argon2";
import { Role } from "../auth/roles";

async function hashPassword(password: string): Promise<string> {
  return argon2.hash(password, {
    type: argon2.argon2id,
    hashLength: 32,
    timeCost: 2,
    memoryCost: 2 ** 16,
  });
}

async function main() {
  console.log("🌱 Seeding database...");

  const pool = mysql.createPool({
    uri: process.env.DATABASE_URL!,
    connectionLimit: 5,
  });

  const db = drizzle(pool, { schema, mode: "default" });

  try {
    await db.delete(schema.userFavoriteServices);
    await db.delete(schema.transactions);
    await db.delete(schema.appointments);
    await db.delete(schema.timeOff);
    await db.delete(schema.workHours);
    await db.delete(schema.services);
    await db.delete(schema.users);

    console.log("🧹 Tables truncated");

    const passwordHash = await hashPassword("12345678");

    await db.insert(schema.users).values([
      {
        id: 1,
        name: "Thomas Aelbrecht",
        phone: "5551234567",
        email: "thomas.aelbrecht@hogent.be",
        passwordHash,
        roles: [Role.ADMIN, Role.USER],
      },
      {
        id: 2,
        name: "Pieter Van Der Helst",
        phone: "5559876543",
        email: "pieter.vanderhelst@hogent.be",
        passwordHash,
        roles: [Role.USER],
      },
      {
        id: 3,
        name: "Karine Samyn",
        phone: "5551112222",
        email: "karine.samyn@hogent.be",
        passwordHash,
        roles: [Role.USER],
      },

      {
        id: 10,
        name: "Test User",
        phone: "0000000000",
        email: "test.user@hogent.be",
        passwordHash,
        roles: [Role.USER],
      },
      {
        id: 11,
        name: "Admin User",
        phone: "1111111111",
        email: "admin.user@hogent.be",
        passwordHash,
        roles: [Role.ADMIN, Role.USER],
      },
    ]);

    console.log("👤 Users inserted");

    await db.insert(schema.services).values([
      { id: 1, name: "Haarsnit", durationService: 30, price: 200 },
      { id: 2, name: "Baardsnit", durationService: 20, price: 150 },
    ]);
    console.log("✂️ Services inserted");

    await db
      .insert(schema.workHours)
      .values([
        { id: 1, weekday: 1, startTime: "09:00:00", endTime: "18:00:00" },
      ]);
    console.log("🕒 Work hours inserted");

    await db.insert(schema.timeOff).values([
      {
        id: 1,
        startAt: new Date("2025-01-01T12:00:00"),
        endAt: new Date("2025-01-01T13:00:00"),
        reason: "Lunch break",
      },
    ]);
    console.log("⏱️ Time off inserted");

    await db.insert(schema.appointments).values([
      {
        id: 1,
        customerId: 1,
        serviceId: 1,
        startAt: new Date("2025-01-02T10:00:00"),
        endAt: new Date("2025-01-02T10:30:00"),
        status: "confirmed",
      },
    ]);
    console.log("📅 Appointments inserted");

    await db.insert(schema.transactions).values([
      {
        id: 1,
        userId: 1,
        appointmentId: 1,
        amount: 200,
        method: "cash",
        date: new Date("2025-01-02T10:35:00"),
      },
    ]);
    console.log("💰 Transactions inserted");

    await db.insert(schema.userFavoriteServices).values([
      { userId: 1, serviceId: 1 },
      { userId: 1, serviceId: 2 },
      { userId: 2, serviceId: 1 },
    ]);
    console.log("⭐ Favorite services inserted");

    console.log("✅ Seeding finished!");
  } catch (err) {
    console.error("❌ Error while seeding:", err);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Fatal error:", err);
    process.exit(1);
  });
