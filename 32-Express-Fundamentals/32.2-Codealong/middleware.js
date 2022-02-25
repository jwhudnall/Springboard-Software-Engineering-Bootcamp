const ExpressError = require("./expressError");
function logger(req, res, next) {
  console.log(`Routing ${req.method} request to ${req.path}.`);
  return next();
}

function checkForPassword(req, res, next) {
  try {
    if (req.query.password !== "monkeybreath") {
      throw new ExpressError("Invalid password", 401);
    } else {
      return next(); // move on
    }
  } catch (e) {
    return next(e); // hit error handling route
  }
}

module.exports = {
  logger,
  checkForPassword,
};
