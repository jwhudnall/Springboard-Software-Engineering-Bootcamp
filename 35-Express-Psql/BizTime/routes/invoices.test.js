process.env.NODE_ENV = "test"; // Must be before db import
const request = require("supertest");
const app = require("../app");
const db = require("../db");

let testInvoice, testCompany;
// Test Setup
beforeEach(async () => {
  const companies = await db.query(`
  INSERT INTO companies (code, name, description)
  VALUES ('tesla', 'Tesla Motors', 'Electric Cars.')
  RETURNING code, name, description`);
  testCompany = companies.rows[0];

  const invoices = await db.query(`
  INSERT INTO invoices (comp_code, amt, paid, add_date)
  VALUES ('tesla', 1999, false, '2022-03-06')
  RETURNING id, comp_code, amt, paid, add_date`);
  testInvoice = invoices.rows[0];
});

afterEach(async () => {
  await db.query(`DELETE FROM invoices`);
  await db.query(`DELETE FROM companies`);
});

afterAll(async () => {
  await db.end();
});

// Test Suite
// GET /invoices
describe("GET /invoices", () => {
  test("Get a list with one invoice", async () => {
    const res = await request(app).get("/invoices");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ invoices: expect.any(Array) });
    expect(res.body.invoices.length).toBe(1);
  });
});
// GET /invoices/:id
describe("GET /invoices/:id", () => {
  test("Get an invoice by id", async () => {
    const res = await request(app).get(`/invoices/${testInvoice.id}`);
    expect(res.statusCode).toBe(200);
    console.log(res.body);
    expect(res.body).toHaveProperty("invoice");
    expect(res.body.invoice).toHaveProperty("id", expect.any(Number));
    expect(res.body.invoice).toHaveProperty("amt", expect.any(Number));
    expect(res.body.invoice).toHaveProperty("paid", expect.any(Boolean));
    expect(res.body.invoice).toHaveProperty("add_date", expect.any(String));
    expect(res.body.invoice).toHaveProperty("paid_date", null);
    expect(res.body.invoice).toHaveProperty("company", {
      code: "tesla",
      description: "Electric Cars.",
      name: "Tesla Motors"
    });
  });
  test("Invalid invoice id throws 404 error", async () => {
    const res = await request(app).get("/invoices/0");
    expect(res.statusCode).toBe(404);
  });
});
// POST /invoices
describe("POST /invoices", () => {
  test("Adds a new invoice", async () => {
    const res = await request(app).post("/invoices").send({ comp_code: "tesla", amt: 500 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({
      invoice: {
        id: expect.any(Number),
        comp_code: "tesla",
        amt: 500,
        paid: false,
        add_date: expect.any(String),
        paid_date: null
      }
    });
  });
  test("Missing request argument 'amt' throws 400 error", async () => {
    const res = await request(app).post("/invoices").send({ comp_code: "tesla" });
    expect(res.statusCode).toBe(400);
  });
  test("Missing request argument 'comp_code' throws 400 error", async () => {
    const res = await request(app).post("/invoices").send({ amt: 500 });
    expect(res.statusCode).toBe(400);
  });
  test("Invalid request argument 'comp_code' throws 400 error", async () => {
    const res = await request(app).post("/invoices").send({ comp_code: "aapl", amt: 500 });
    expect(res.statusCode).toBe(400);
  });
  test("Invalid request argument 'amt' throws 400 error", async () => {
    const res = await request(app).post("/invoices").send({ comp_code: "tesla", amt: "lots" });
    expect(res.statusCode).toBe(400);
  });
});

// PUT /invoices/:id
describe("PUT /invoices/:id", () => {
  test("Update an existing invoice (paid status unchanged)", async () => {
    const res = await request(app)
      .put(`/invoices/${testInvoice.id}`)
      .send({ amt: 300, paid: false });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      invoice: {
        id: expect.any(Number),
        comp_code: "tesla",
        amt: 300,
        paid: false,
        add_date: expect.any(String),
        paid_date: null
      }
    });
  });
  test("Update an existing invoice (paid status changed)", async () => {
    const res = await request(app)
      .put(`/invoices/${testInvoice.id}`)
      .send({ amt: 300, paid: true });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      invoice: {
        id: expect.any(Number),
        comp_code: "tesla",
        amt: 300,
        paid: true,
        add_date: expect.any(String),
        paid_date: expect.any(String)
      }
    });
  });
  test("Invalid request argument 'amt' throws 400 error", async () => {
    const res = await request(app).put(`/invoices/${testInvoice.id}`).send({ amt: "something" });
    expect(res.statusCode).toBe(400);
  });
  test("Missing request argument 'amt' throws 400 error", async () => {
    const res = await request(app).put(`/invoices/${testInvoice.id}`);
    expect(res.statusCode).toBe(400);
  });
  test("Invalid invoice id throws 404 error", async () => {
    const res = await request(app).put(`/invoices/0`).send({ amt: 300 });
    expect(res.statusCode).toBe(404);
  });
});
// DELETE /invoices/:id
describe("DELETE /invoices/:id", () => {
  test("Deletes an existing invoice", async () => {
    const res = await request(app).delete(`/invoices/${testInvoice.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: "deleted" });
  });
  test("Invalid invoice id throws 404 error", async () => {
    const res = await request(app).delete("/invoices/0");
    expect(res.statusCode).toBe(404);
  });
});
