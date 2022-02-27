process.env.NODE_ENV = "test";
const request = require("supertest");

const app = require("./app");
let items = require("./fakeDb");
// let item1 = { name: "ipad", price: 399 };

beforeEach(() => {
  items.push({ name: "ipad", price: 399 });
  console.log(`BEFORE: ${JSON.stringify(items)}`);
});

afterEach(() => {
  // items.length = 0;
  items.splice(0, items.length);
  console.log("Array reset!");
  console.log(`Items: ${JSON.stringify(items)}`);
});

describe("GET /items", () => {
  test("get all items", async () => {
    const res = await request(app).get("/items");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ items: [{ name: "ipad", price: 399 }] });
  });
});

describe("GET /items/:name", () => {
  test("get item by name", async () => {
    const res = await request(app).get("/items/ipad");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ name: "ipad", price: 399 });
  });
  test("get 400 error for nonexistent item", async () => {
    const res = await request(app).get("/items/macbook");
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body).toHaveProperty("error.message");
    expect(res.body).toHaveProperty("error.status");
  });
});

describe("POST /items", () => {
  test("successfully add item", async () => {
    const res = await request(app)
      .post("/items")
      .send({ name: "airpods", price: 199 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("added");
    expect(res.body).toEqual({ added: { name: "airpods", price: 199 } });
    expect(items.length).toEqual(2);
  });
  test("disallows adding an item for requests lacking proper properties", async () => {
    const res = await request(app).post("/items").send({ name: "newItem" });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});

describe("/PATCH /items/:name", () => {
  test("Updating an existing item's price", async () => {
    const res = await request(app)
      .patch("/items/ipad")
      .send({ name: "ipad", price: 349 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("updated");
    expect(res.body).toEqual({ updated: { name: "ipad", price: 349 } });
  });
  test("Update an existing items name", async () => {
    const res = await request(app)
      .patch("/items/ipad")
      .send({ name: "iPad Air" });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("updated");
    expect(res.body).toEqual({ updated: { name: "iPad Air", price: 399 } });
  });
  test("Error response if item doesn't exist", async () => {
    const res = await request(app)
      .patch("/items/macbook")
      .send({ name: "Macbook Pro" });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});

describe("/DELETE /items/:name", () => {
  test("Error response if item doesn't exist", async () => {
    const res = await request(app).delete("/items/macbook");
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
  test("Successfully deletes existing item", async () => {
    const res = await request(app).delete("/items/ipad");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
  });
});
