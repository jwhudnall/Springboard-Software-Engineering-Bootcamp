const express = require("express");
const router = express.Router();
const db = require("../db");
const ExpressError = require("../expressError");

router.get("/", async (req, res, next) => {
  try {
    const results = await db.query(`SELECT * FROM users`);
    return res.json({ users: results.rows });
  } catch (e) {
    return next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    return res.send({ user: results.rows[0] });
  } catch (e) {
    return next(e);
  }
});

router.get("/search", async (req, res, next) => {
  try {
    const { type } = req.query;
    const results = await db.query(`SELECT * FROM users WHERE type=$1`, [type]);
    return res.json(results.rows);
  } catch (e) {
    return next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, type } = req.body;
    const results = await db.query(
      "INSERT INTO users (name, type) VALUES ($1, $2) RETURNING *",
      [name, type]
    );
    return res.status(201).json(results.rows);
  } catch (e) {
    return next(e);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const { name, type } = req.body;
    const { id } = req.params;
    const results = await db.query(
      "UPDATE users SET name=$1, type=$2 WHERE id=$3 RETURNING *",
      [name, type, id]
    );
    return res.send(results.rows[0]);
  } catch (e) {
    return next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await db.query("DELETE FROM users WHERE id = $1", [id]);
    return res.json({ msg: `User with id ${id} Deleted.` });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
