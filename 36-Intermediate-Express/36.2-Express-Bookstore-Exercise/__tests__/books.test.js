process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");
const db = require("../db");
const Book = require("../models/book");

// Test setup

const book1 = {
  isbn: "0691161518",
  amazon_url: "http://a.co/eobPtX2",
  author: "Matthew Lane",
  language: "english",
  pages: 264,
  publisher: "Princeton University Press",
  title: "Power-Up: Unlocking the Hidden Mathematics in Video Games",
  year: 2017
};

beforeEach(async () => {
  await Book.create(book1);
});

afterEach(async () => {
  await db.query("DELETE FROM books");
});

afterAll(async () => {
  db.end();
});

describe("GET /books", () => {
  test("Returns list of books", async () => {
    const res = await request(app).get("/books");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("books");
    expect(res.body).toHaveProperty("books", expect.any(Array));
    expect(res.body.books).toHaveLength(1);
    for (let key of Object.keys(book1)) {
      expect(res.body.books[0]).toHaveProperty(key);
    }
  });
});

describe("GET /books/:isbn", () => {
  test("Returns book details", async () => {
    const res = await request(app).get(`/books/${book1.isbn}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.book.isbn).toBe(book1.isbn);
    for (let key of Object.keys(book1)) {
      expect(res.body.book).toHaveProperty(key);
    }
  });
  test("Invalid isbn returns 404 status", async () => {
    const res = await request(app).get(`/books/invalidIsbn`);
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error");
  });
});

describe("POST /books", () => {
  test("Creates a new book", async () => {
    const res = await request(app).post("/books").send({
      isbn: "12345",
      amazon_url: "http://a.co/akisjd",
      author: "James H",
      language: "english",
      pages: 100,
      publisher: "Princeton",
      title: "Where the Wild Things Roam",
      year: 2021
    });
    expect(res.statusCode).toBe(201);
    for (let key of Object.keys(book1)) {
      expect(res.body.book).toHaveProperty(key);
    }
  });

  test("Prevents book creation for invalid data types", async () => {
    const res = await request(app).post("/books").send({
      isbn: 123, // Should be a string
      amazon_url: "http://a.co/akisjd",
      author: "James H",
      language: "english",
      pages: 100,
      publisher: "Princeton",
      title: "Where the Wild Things Roam",
      year: 2021
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});

describe("PUT /books/:isbn", () => {
  test("Should update an existing book", async () => {
    const res = await request(app).put(`/books/${book1.isbn}`).send({
      isbn: "0691161518",
      amazon_url: "http://a.co/eobPtX2",
      author: "Matthew Lane",
      language: "swedish",
      pages: 264,
      publisher: "Princeton University Press",
      title: "Power-Up: Unlocking the Hidden Mathematics in Video Games",
      year: 2017
    });
    expect(res.statusCode).toBe(200);
    console.log(res.body);
    for (let key of Object.keys(book1)) {
      expect(res.body.book).toHaveProperty(key);
    }
  });
});
