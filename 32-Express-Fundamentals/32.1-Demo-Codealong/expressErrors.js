class ExpressError extends Error {
  constructor(msg, status) {
    super(); // runs constructor for "Error" class
    this.msg = msg;
    this.status = status;
    console.error(this.stack);
  }
}

module.exports = ExpressError;
