import { Test } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { AppModule } from "../src/app.module";

describe("Transactions (e2e)", () => {
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

  it("GET /api/transactions requires auth", async () => {
    await request(app.getHttpServer()).get("/api/transactions").expect(401);
  });

  it("GET /api/transactions works with token", async () => {
    await request(app.getHttpServer())
      .get("/api/transactions")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});
