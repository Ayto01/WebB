/* eslint-disable prettier/prettier */
import type { INestApplication } from "@nestjs/common";
import request from "supertest";
import { TEST_ADMIN_EMAIL, TEST_PASSWORD, TEST_USER_EMAIL } from "../seeds/user";

export async function login(app: INestApplication): Promise<string> {
  const res = await request(app.getHttpServer())
    .post("/api/sessions")
    .send({ email: TEST_USER_EMAIL, password: TEST_PASSWORD })
    .expect(200);

  if (!res.body?.token) throw new Error("No token received");
  return res.body.token as string;
}

export async function loginAdmin(app: INestApplication): Promise<string> {
  const res = await request(app.getHttpServer())
    .post("/api/sessions")
    .send({ email: TEST_ADMIN_EMAIL, password: TEST_PASSWORD })
    .expect(200);

  if (!res.body?.token) throw new Error("No token received");
  return res.body.token as string;
}

