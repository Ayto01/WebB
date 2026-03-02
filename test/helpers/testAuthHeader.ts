import type supertest from "supertest";

export default function testAuthHeader(
  requestFactory: () => supertest.Test,
): void {
  it("should respond with 401 when not authenticated", async () => {
    const res = await requestFactory();
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("You need to be signed in");
  });

  it("should respond with 401 with a malformed token", async () => {
    const res = await requestFactory().set(
      "Authorization",
      "Bearer INVALID TOKEN",
    );
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Invalid authentication token");
  });
}
