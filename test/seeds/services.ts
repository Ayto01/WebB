import type { DatabaseProvider } from "../../src/drizzle/drizzle.provider";
import { services, appointments, transactions } from "../../src/drizzle/schema";

type ServiceInsert = typeof services.$inferInsert;

export const SERVICES_SEED_DB: ServiceInsert[] = [
  { name: "Knippen", durationService: 30, price: 23 },
  { name: "Baard", durationService: 15, price: 12 },
];

export const SERVICES_SEED_API = [
  { name: "Knippen", duration_min: 30, price: 23 },
  { name: "Baard", duration_min: 15, price: 12 },
];

export async function seedServices(drizzle: DatabaseProvider) {
  await clearServices(drizzle);
  await drizzle.insert(services).values(SERVICES_SEED_DB);
}

export async function clearServices(drizzle: DatabaseProvider) {
  await drizzle.delete(transactions);
  await drizzle.delete(appointments);
  await drizzle.delete(services);
}
