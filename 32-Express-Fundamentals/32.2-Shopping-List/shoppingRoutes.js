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
    return res.status(201).json({ added: newItem });
  } catch (e) {
    return next(e);
  }
});

router.get("/:name", (req, res, next) => {
  try {
    const item = ITEMS.find((i) => i.name === req.params.name);
    if (!item) {
      throw new ExpressError("Item not found", 400);
    }
    return res.json(item);
  } catch (e) {
    return next(e);
  }
});

router.patch("/:name", (req, res, next) => {
  try {
    const i = ITEMS.findIndex((i) => i.name === req.params.name);
    console.log(`Index: ${i}`);
    if (i === -1) {
      throw new ExpressError("Item not found", 400);
    }
    const item = ITEMS[i];
    item.name = req.body.name || item.name;
    item.price = req.body.price || item.price;
    return res.json({ updated: item });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
