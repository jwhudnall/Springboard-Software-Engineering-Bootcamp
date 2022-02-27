const express = require("express");
const ExpressError = require("./expressError");
const shoppingRoutes = require("./shoppingRoutes");
const morgan = require("morgan");

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.use("/items", shoppingRoutes);
app.get("/favicon.ico", (req, res) => res.sendStatus(204)); // no content code

// Error Handler
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
  console.log("Server started on port 3000...");
});
