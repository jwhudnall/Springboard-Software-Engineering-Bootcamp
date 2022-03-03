const express = require("express");
const app = express();
const ExpressError = require("./expressError");

app.use(express.json());

const uRoutes = require("./routes/users");
app.use("/users", uRoutes);

// 404 Handler
app.use((req, res, next) => {
  const err = new ExpressError("Not Found", 404);
  return next(err);
});

// Generic error handler
app.use((err, req, res, next) => {
  let status = err.status || 500;
  return res.status(status).json({
    error: {
      message: err.message,
      status: status,
    },
  });
});

module.exports = app;
