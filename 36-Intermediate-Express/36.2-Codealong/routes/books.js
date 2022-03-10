const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError");
const jsonschema = require("jsonschema");
const bookSchema = require("../schemas/bookSchema.json");

router.post("/", function (req, res, next) {
  // Validate req.body against our book schema:
  const result = jsonschema.validate(req.body, bookSchema);

  // If it's not valid...
  if (!result.valid) {
    //Collect all the errors in an array
    const listOfErrors = result.errors.map((e) => e.stack);
    const err = new ExpressError(listOfErrors, 400);
    //Call next with error
    return next(err);
  }
  // This is where you would insert something into your DB
  // If we make it here, we know the data is validated!
  return res.json("THAT IS VALID!");
});

module.exports = router;
