const express = require("express");
const ExpressError = require("./expressError");
const userRoutes = require("./userRoutes");
const middleware = require("./middleware");

const app = express();

app.use(express.json());

app.use(middleware.logger);

app.use("/users", userRoutes);
app.get("/favicon.ico", (req, res) => res.sendStatus(204)); // no content code

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
