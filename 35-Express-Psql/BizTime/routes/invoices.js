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
      throw new ExpressError(`Invoice with id ${id} not found`, 404);
    }
    const { amt, paid, add_date, paid_date, code, name, description } = results.rows[0];
    return res.json({
      invoice: { id, amt, paid, add_date, paid_date, company: { code, name, description } }
    });
  } catch (e) {
    return next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { comp_code, amt } = req.body;
    const company = await db.query("SELECT code FROM companies WHERE code=$1", [comp_code]);
    if (company.rowCount === 0) {
      throw new ExpressError(`Company code '${comp_code}' does not exist.`, 400);
    }
    if (!comp_code || !amt) {
      throw new ExpressError("Request body requires 'comp_code' and 'amt' arguments.", 400);
    }
    if (isNaN(parseInt(amt))) {
      throw new ExpressError("amt should have a numerical value", 400);
    }
    const results = await db.query(
      "INSERT INTO invoices (comp_code, amt) VALUES ($1, $2) RETURNING id, comp_code, amt, paid, add_date, paid_date",
      [comp_code, amt]
    );
    return res.status(201).json({ invoice: results.rows[0] });
  } catch (e) {
    return next(e);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const amt = parseInt(req.body.amt);
    if (!amt) throw new ExpressError("Request body requires 'amt' argument", 400);
    const results = await db.query("UPDATE invoices SET amt=$1 WHERE id=$2 RETURNING *", [amt, id]);
    if (results.rowCount === 0) throw new ExpressError(`Invoice with id ${id} not found`, 404);
    return res.json({ invoice: results.rows[0] });
  } catch (e) {
    return next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await db.query("DELETE FROM invoices WHERE id=$1", [id]);
    if (results.rowCount === 0) {
      throw new ExpressError(`Invoice with id ${id} not found`, 404);
    }
    return res.json({ status: "deleted" });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
