import { INestApplication } from "@nestjs/common";
import { AuthService } from "../../src/auth/auth.service";
import type { DatabaseProvider } from "../../src/drizzle/drizzle.provider";
import { users } from "../../src/drizzle/schema";
import { eq, or } from "drizzle-orm";

export const TEST_PASSWORD = "12345678";
export const TEST_USER_EMAIL = "test.user@hogent.be";
export const TEST_ADMIN_EMAIL = "admin.user@hogent.be";

export async function seedUsers(
  app: INestApplication,
  drizzle: DatabaseProvider,
) {
  await drizzle
    .delete(users)
    .where(
      or(eq(users.email, TEST_USER_EMAIL), eq(users.email, TEST_ADMIN_EMAIL)),
    );

  const authService = app.get(AuthService);
  const passwordHash = await authService.hashPassword(TEST_PASSWORD);

  await drizzle.insert(users).values([
    {
      name: "Test User",
      phone: "0000000000",
      email: TEST_USER_EMAIL,
      passwordHash,
      roles: ["user"],
    },
    {
      name: "Admin User",
      phone: "1111111111",
      email: TEST_ADMIN_EMAIL,
      passwordHash,
      roles: ["admin", "user"],
    },
  ]);
}

export async function clearUsers(drizzle: DatabaseProvider) {
  await drizzle
    .delete(users)
    .where(
      or(eq(users.email, TEST_USER_EMAIL), eq(users.email, TEST_ADMIN_EMAIL)),
    );
}
