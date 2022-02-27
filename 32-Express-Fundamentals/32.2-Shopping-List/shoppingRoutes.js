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
    const idx = ITEMS.findIndex((i) => i.name === req.params.name);
    if (idx === -1) {
      throw new ExpressError("Item not found", 400);
    }
    // if (!req.body.name && !req.body.price) {
    //   throw new ExpressError(
    //     "Request requires one or both of the following keys: name, price.",
    //     400
    //   );
    // }
    const item = ITEMS[idx];
    item.name = req.body.name || item.name;
    item.price = req.body.price || item.price;
    return res.json({ updated: item });
  } catch (e) {
    return next(e);
  }
});

router.delete("/:name", (req, res, next) => {
  try {
    const idx = ITEMS.findIndex((i) => i.name === req.params.name);
    if (idx === -1) {
      throw new ExpressError("Item not found", 400);
    }
    ITEMS.splice(idx, 1);
    return res.json({ message: "Deleted" });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
