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
describe("HOPE THIS WORKS", () => {
  test("Blah", () => {
    console.log(testUser);
  });
});
