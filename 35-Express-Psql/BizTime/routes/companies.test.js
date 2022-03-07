process.env.NODE_ENV = "test"; // Must be before db import
const request = require("supertest");
const app = require("../app");
const db = require("../db");

let testCompany;
// Test Setup
beforeEach(async () => {
  const result = await db.query(`
  INSERT INTO companies (code, name, description)
  VALUES ('tesla', 'Tesla Motors', 'Electric Cars.')
  RETURNING code, name, description`);
  testCompany = result.rows[0];
});

afterEach(async () => {
  await db.query(`DELETE FROM companies`);
});

afterAll(async () => {
  await db.end();
});

// Test Suite
describe("GET /companies", () => {
  test("Get a list with one company", async () => {
    const res = await request(app).get("/companies");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("companies");
    expect(res.body).toEqual({ companies: [{ code: "tesla", name: "Tesla Motors" }] });
    expect(res.body.companies.length).toBe(1);
  });
});

describe("GET /companies/:code", () => {
  test("Get a specific company", async () => {
    const res = await request(app).get("/companies/tesla");
    expect(res.statusCode).toBe(200);
    expect(res.body.company).toEqual(
      expect.objectContaining({
        code: "tesla",
        name: "Tesla Motors",
        description: "Electric Cars.",
        invoices: expect.any(Array)
      })
    );
  });
  test("Invalid company code returns 404", async () => {
    const res = await request(app).get("/companies/A1b3a");
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error");
    expect(res.body).toHaveProperty("status");
  });
});
// POST /companies
describe("POST /companies", () => {
  test("Add a new company", async () => {
    const res = await request(app)
      .post("/companies")
      .send({ code: "apple", name: "Apple", description: "Apple Computers." });
    const companies = await db.query("SELECT * FROM companies");
    expect(res.statusCode).toBe(201);
    expect(companies.rowCount).toBe(2);
    expect(res.body).toEqual({
      company: { code: "apple", name: "Apple", description: "Apple Computers." }
    });
  });
  test("Request bodies missing 'name' result in status 400 error", async () => {
    const res = await request(app)
      .post("/companies")
      .send({ code: "apple", description: "Apple Computers." });
    expect(res.statusCode).toBe(400);
  });
  test("Request bodies missing 'code' result in status 400 error", async () => {
    const res = await request(app)
      .post("/companies")
      .send({ name: "Apple", description: "Apple Computers." });
    expect(res.statusCode).toBe(400);
  });
  test("Request bodies missing 'description' result in status 400 error", async () => {
    const res = await request(app).post("/companies").send({ code: "apple", name: "Apple" });
    expect(res.statusCode).toBe(400);
  });
});
// PUT /companies/:code
describe("PUT /companies/:code", () => {
  test("Update a company", async () => {
    const res = await request(app)
      .put("/companies/tesla")
      .send({ name: "teslaMotors", description: "Electric Cars." });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      company: { code: "tesla", name: "teslaMotors", description: "Electric Cars." }
    });
  });
  test("Invalid company code throw 404 error", async () => {
    const res = await request(app)
      .put("/companies/a1jr1")
      .send({ name: "teslaMotors", description: "Electric Cars." });
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error");
    expect(res.body).toHaveProperty("status");
  });
});
// DELETE /companies/:code
describe("DELETE /companies/:code", () => {
  test("Delete a company that exists", async () => {
    const res = await request(app).delete("/companies/tesla");
    const companies = await db.query("SELECT * FROM companies");
    expect(res.statusCode).toBe(200);
    expect(companies.rowCount).toBe(0);
  });
  test("Invalid company code throw 404 error", async () => {
    const res = await request(app).delete("/companies/aae4q2");
    expect(res.statusCode).toBe(404);
  });
});
