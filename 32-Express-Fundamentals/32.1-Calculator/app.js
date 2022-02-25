const express = require("express");
const { median, mean, mode, calcResponse, handleInput } = require("./helpers");
const app = express();

app.use(express.json());

app.get("/mean", (req, res) => {
  const { nums } = req.query;
  const numsOrErrorMsg = handleInput(nums);
  if (typeof numsOrErrorMsg === "object" && !Array.isArray(numsOrErrorMsg)) {
    return res.status(400).json(numsOrErrorMsg);
  }
  const result = mean(numsOrErrorMsg);
  return res.json(calcResponse("mean", result));
});

app.get("/median", (req, res) => {
  const { nums } = req.query;
  const numsOrErrorMsg = handleInput(nums);
  if (typeof numsOrErrorMsg === "object" && !Array.isArray(numsOrErrorMsg)) {
    return res.status(400).json(numsOrErrorMsg);
  }
  const result = median(numsOrErrorMsg);
  return res.json(calcResponse("median", result));
});

app.get("/mode", (req, res) => {
  const { nums } = req.query;
  const numsOrErrorMsg = handleInput(nums);
  if (typeof numsOrErrorMsg === "object" && !Array.isArray(numsOrErrorMsg)) {
    return res.status(400).json(numsOrErrorMsg);
  }
  const result = mode(numsOrErrorMsg);
  return res.json(calcResponse("mode", result));
});

app.listen(3000, () => {
  console.log("Port running on port 3000");
});
