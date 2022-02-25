function logger(req, res, next) {
  console.log(`Routing ${req.method} request to ${req.path}.`);
  return next();
}

module.exports = {
  logger,
};
