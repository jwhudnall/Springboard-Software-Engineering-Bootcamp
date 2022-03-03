process.env.NODE_ENV = "test"; // Must be before db import
const request = require("supertest");
const app = require("../app");
const db = require("../db");

let testUser;
// Test Setup
beforeEach(async () => {
  const result = await db.query(
    `INSERT INTO users (name, type) VALUES ('Peanut', 'admin') RETURNING id, name, type`
  );
  testUser = result.rows[0];
});

afterEach(async () => {
  await db.query(`DELETE FROM users`);
});

afterAll(async () => {
  await db.end();
});

// Test Suite
describe("GET /users", () => {
  test("Get a list with one user", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ users: [testUser] });
  });
});

describe("GET /users/:id", () => {
  test("Get a list with one user", async () => {
    const res = await request(app).get(`/users/${testUser.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ user: testUser });
  });
  test("Responds with 404 for invalid id", async () => {
    const res = await request(app).get(`/users/0`);
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error.message");
    expect(res.body).toHaveProperty("error.status");
  });
});

describe("POST /users", () => {
  test("Creates a single user", async () => {
    const res = await request(app)
      .post("/users")
      .send({ name: "Billy", type: "staff" });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({
      user: { id: expect.any(Number), name: "Billy", type: "staff" },
    });
  });
});

describe("PATCH /users/:id", () => {
  test("Updates a single user", async () => {
    const res = await request(app)
      .patch(`/users/${testUser.id}`)
      .send({ name: "Billy", type: "admin" });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      user: { id: testUser.id, name: "Billy", type: "admin" },
    });
  });
  test("Returns 404 for invalid user id", async () => {
    const res = await request(app)
      .patch(`/users/0`)
      .send({ name: "Billy", type: "admin" });
    expect(res.statusCode).toBe(404);
  });
});

describe("DELETE /users/:id", () => {
  test("Deletes a single user", async () => {
    const res = await request(app)
      .delete(`/users/${testUser.id}`)
      .send({ name: "Billy", type: "admin" });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ msg: `User with id ${testUser.id} Deleted.` });
  });
  test("Returns 404 for invalid user id", async () => {
    const res = await request(app).delete(`/users/0`);
    expect(res.statusCode).toBe(404);
  });
});
