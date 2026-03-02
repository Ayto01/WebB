import { Test } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { AppModule } from "../src/app.module";

describe("Auth (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.setGlobalPrefix("api");
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("POST /api/sessions → login success", async () => {
    const res = await request(app.getHttpServer())
      .post("/api/sessions")
      .send({
        email: "thomas.aelbrecht@hogent.be",
        password: "12345678",
      })
      .expect(200);

    expect(res.body.token).toBeDefined();
  });

  it("POST /api/sessions → wrong password", async () => {
    await request(app.getHttpServer())
      .post("/api/sessions")
      .send({
        email: "thomas.aelbrecht@hogent.be",
        password: "fout",
      })
      .expect(401);
  });
});
