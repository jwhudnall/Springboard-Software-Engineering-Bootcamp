const express = require("express");
const ExpressError = require("./expressErrors");
const app = express();

app.use(express.json());

const CANDIES = [
  { name: "snickers", qty: 43, price: 1.5 },
  { name: "skittles", qty: 12, price: 0.99 },
];

app.get("/candies", (req, res) => {
  debugger;
  return res.json(CANDIES);
});

app.post("/candies", (req, res) => {
  // return res.json(CANDIES);
  throw new ExpressError("Uh Oh!", 403);
});
app.post("/candies", (req, res) => {
  if (req.body.name.toLowerCase() === "circus peanuts") {
    return res.status(403).json({ msg: "Horrible choice. Forbidden!" });
  }
  CANDIES.push(req.body); // Should validate before doing this
  return res.status(201).json(CANDIES);
});

app.use((error, req, res, next) => {
  res.send("Oh No, error!");
});

app.listen(3000, () => {
  console.log("Port running on port 3000");
});
