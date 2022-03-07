process.env.NODE_ENV = "test"; // Must be before db import
const request = require("supertest");
const app = require("./app");
const db = require("./db");

afterAll(async () => {
  await db.end();
});

describe("Non-route test suite", () => {
  test("Returns 404 not found for unknown routes", async () => {
    const res = await request(app).get("/invoi");
    expect(res.statusCode).toBe(404);
  });
});
