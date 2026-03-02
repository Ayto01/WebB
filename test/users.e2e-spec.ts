import { Test } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { AppModule } from "../src/app.module";

describe("Users (e2e)", () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.setGlobalPrefix("api");
    await app.init();

    const res = await request(app.getHttpServer())
      .post("/api/sessions")
      .send({
        email: "thomas.aelbrecht@hogent.be",
        password: "12345678",
      })
      .expect(200);

    token = res.body.token;
  });

  afterAll(async () => {
    await app.close();
  });

  it("GET /api/users/me returns my profile", async () => {
    await request(app.getHttpServer())
      .get("/api/users/me")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });

  it("GET /api/users (admin) works", async () => {
    await request(app.getHttpServer())
      .get("/api/users")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});
