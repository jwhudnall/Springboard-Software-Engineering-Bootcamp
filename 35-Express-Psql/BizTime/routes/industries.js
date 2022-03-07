const express = require("express");
const router = express.Router();
const db = require("../db");
const ExpressError = require("../expressError");
const slugify = require("slugify");

router.get("/", async (req, res, next) => {
  try {
    const data = await db.query(
      `SELECT i.code, i.industry, c.code AS company
      FROM industries AS i
      LEFT JOIN companies_industries AS ci
      ON i.code = ci.industry_code
      LEFT JOIN companies AS c
      ON ci.company_code = c.code
      `
    );

    const companies = data.rows.reduce((acc, next) => {
      const code = next.code;
      const company = next.company;
      if (acc[code] === undefined && company) {
        acc[code] = [company];
      } else if (acc[code] === undefined) {
        acc[code] = [];
      } else if (!acc[code].includes(company)) {
        acc[code].push(company);
      }
      return acc;
    }, {});

    const industryData = await db.query(`SELECT code, industry FROM industries`);
    const industries = industryData.rows;

    for (industry of industries) {
      const code = industry.code;
      industry.companies = companies[code] || [];
    }

    return res.json({ industries: industries });
  } catch (e) {
    return next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { industry } = req.body;
    if (industry === undefined) {
      throw new ExpressError("Request body requires 'industry' argument.", 400);
    }
    const industries = await db.query(`SELECT code, industry FROM industries WHERE industry=$1`, [
      industry
    ]);
    if (industries.rowCount > 0) throw new ExpressError(`Industry already exists`, 400);
    const code = slugify(industry, { lower: true, remove: /[*+~.()'"!:@]/g });
    const results = await db.query(
      `
    INSERT INTO industries (code, industry)
    VALUES ($1, $2)
    RETURNING code, industry`,
      [code, industry]
    );
    if (results.rowCount === 0) {
      throw new ExpressError("Industry already exists", 400);
    }
    return res.status(201).json({ industry: results.rows[0] });
  } catch (e) {
    return next(e);
  }
});

router.post("/company", async (req, res, next) => {
  try {
    const { companyCode, industryCode } = req.body;
    if (companyCode === undefined || industryCode === undefined) {
      throw new ExpressError(
        "Request body requires 'companyCode' and 'industryCode' arguments.",
        400
      );
    }
    // Refactor into Promise.all:
    const companies = await db.query("SELECT code FROM companies WHERE code=$1", [companyCode]);
    const industries = await db.query("SELECT code FROM industries WHERE code=$1", [industryCode]);
    const relationship = await db.query(
      `
    SELECT company_code, industry_code
    FROM companies_industries
    WHERE company_code=$1
    AND industry_code=$2
    `,
      [companyCode, industryCode]
    );
    if (companies.rowCount === 0) {
      throw new ExpressError(`Invalid companyCode: '${companyCode}'`, 404);
    }
    if (industries.rowCount === 0) {
      throw new ExpressError(`Invalid industryCode: '${industryCode}'`, 404);
    }
    if (relationship.rowCount > 0) {
      throw new ExpressError("Relationship already exists", 400);
    }
    const results = await db.query(
      `
    INSERT INTO companies_industries (company_code, industry_code)
    VALUES ($1, $2) RETURNING company_code, industry_code
    `,
      [companyCode, industryCode]
    );
    // debugger;
    return res.status(201).json({ relationshipAdded: results.rows[0] });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
