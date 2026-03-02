import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { createTestApp } from "./helpers/create-app";

describe("Health", () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it("GET /api/health/ping -> pong", async () => {
    const res = await request(app.getHttpServer()).get("/api/health/ping");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ pong: true });
  });
});
