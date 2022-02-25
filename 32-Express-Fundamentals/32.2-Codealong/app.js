const express = require("express");
const ExpressError = require("./expressError");
const userRoutes = require("./userRoutes");

const app = express();

app.use(express.json());

app.use("/users", userRoutes);

// 404 Handler
app.use((req, res) => {
  return new ExpressError("Not Found!", 404);
});

// Generic Error Handler
app.use((err, req, res, next) => {
  let status = err.status || 500;

  return res.status(status).json({
    error: {
      message: err.message,
      status: status,
    },
  });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000...");
});
