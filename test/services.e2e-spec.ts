import { INestApplication } from "@nestjs/common";
import request from "supertest";
import {
  DrizzleAsyncProvider,
  type DatabaseProvider,
} from "../src/drizzle/drizzle.provider";
import { createTestApp } from "./helpers/create-app";
import {
  seedServices,
  clearServices,
  SERVICES_SEED_API,
} from "./seeds/services";

describe("Services (e2e)", () => {
  let app: INestApplication;
  let drizzle: DatabaseProvider;

  const url = "/api/services";

  beforeAll(async () => {
    app = await createTestApp();
    drizzle = app.get(DrizzleAsyncProvider);
    await seedServices(drizzle);
  });

  afterAll(async () => {
    await clearServices(drizzle);
    await app.close();
  });

  it("should 200 and return services", async () => {
    const res = await request(app.getHttpServer()).get(url).expect(200);

    expect(Array.isArray(res.body.items)).toBe(true);

    expect(res.body.items).toEqual(
      expect.arrayContaining(
        SERVICES_SEED_API.map((x) => expect.objectContaining(x)),
      ),
    );
  });
});
