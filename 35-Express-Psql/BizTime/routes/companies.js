const express = require("express");
const router = express.Router();
const db = require("../db");
const ExpressError = require("../expressError");

router.get("/", async (req, res, next) => {
  try {
    const results = await db.query("SELECT code, name FROM companies");
    return res.json({ companies: results.rows });
  } catch (e) {
    return next(e);
  }
});

router.get("/:code", async (req, res, next) => {
  try {
    const { code } = req.params;
    const results = await db.query(
      "SELECT code, name, description FROM companies WHERE code=$1",
      [code]
    );
    if (results.rowCount === 0) {
      throw new ExpressError(`Invalid company code: ${code}`, 404);
    }
    return res.json({ company: results.rows[0] });
  } catch (e) {
    return next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { code, name, description } = req.body;
    if ([code, name, description].some((el) => Boolean(el) === false)) {
      throw new ExpressError(
        "Request body requires 'code', 'name' and 'description' arguments",
        400
      );
    }
    const results = await db.query(
      "INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) RETURNING code, name, description",
      [code, name, description]
    );
    debugger;
    return res.status(201).json({ company: results.rows[0] });
  } catch (e) {
    return next(e);
  }
});
router.put("/:code", async (req, res, next) => {
  try {
    const { code } = req.params;
    const { name, description } = req.body;
    if (!name || !description) {
      throw new ExpressError(
        "Request body requires 'name' and 'description' arguments",
        400
      );
    }
    const results = await db.query(
      `UPDATE companies SET name=$1, description=$2 WHERE code=$3 RETURNING code, name, description`,
      [name, description, code]
    );
    if (results.rowCount === 0) {
      throw new ExpressError(`Company with code '${code}' not found`, 404);
    }
    return res.json({ company: results.rows[0] });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
