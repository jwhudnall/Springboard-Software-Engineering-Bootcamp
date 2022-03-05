const express = require("express");
const router = express.Router();
const db = require("../db");
const ExpressError = require("../expressError");

router.get("/", async (req, res, next) => {
  try {
    const results = await db.query("SELECT id, comp_code FROM invoices");
    return res.json({ invoices: results.rows });
  } catch (e) {
    return next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const results = await db.query(
      `SELECT id, amt, paid, add_date, paid_date, code, name, description
      FROM invoices
      JOIN companies ON invoices.comp_code = companies.code
      WHERE id=$1`,
      [id]
    );
    if (results.rowCount === 0) {
      throw new ExpressError(`Company with id ${id} not found`, 404);
    }
    const { amt, paid, add_date, paid_date, code, name, description } = results.rows[0];
    return res.json({
      invoice: { id, amt, paid, add_date, paid_date, company: { code, name, description } }
    });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
