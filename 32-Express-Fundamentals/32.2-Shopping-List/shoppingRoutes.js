const express = require("express");
const ExpressError = require("./expressError");
const ITEMS = require("./fakeDb");
const router = new express.Router();

// Shopping Routes Go here
router.get("/", (req, res) => {
  return res.json({ items: ITEMS });
});

router.post("/", (req, res, next) => {
  console.log(req.body);
  try {
    if (!req.body.name || !req.body.price) {
      throw new ExpressError(
        "JSON must include 'name' and 'price' key-value pairs.",
        400
      );
    }
    const newItem = { name: req.body.name, price: req.body.price };
    ITEMS.push(newItem);
    return res.json({ added: newItem });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
