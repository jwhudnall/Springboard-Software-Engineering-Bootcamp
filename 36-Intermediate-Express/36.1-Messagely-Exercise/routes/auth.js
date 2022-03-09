const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError");
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require("../config");
const { authenticateJWT, ensureCorrectUser, ensureLoggedIn } = require("../middleware/auth");
const User = require("../models/user");

/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/
router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const isAuthenticated = await User.authenticate(username, password);
    if (await User.authenticate(username, password)) {
      const token = jwt.sign({ username }, SECRET_KEY);
      User.updateLoginTimestamp(username);
      return res.json({ token });
    } else {
      throw new ExpressError("Username and password required", 400);
    }
  } catch (e) {
    return next(e);
  }
});

/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */
router.post("/register", async (req, res, next) => {
  try {
    const { username, password, first_name, last_name, phone } = await User.register(req.body);
    const token = jwt.sign({ username }, SECRET_KEY);
    await User.updateLoginTimestamp(username);
    return res.status(201).json({ token });
  } catch (e) {
    if (e.code === "23502") {
      return next(
        new ExpressError(
          "Missing one or more request arguments: username, password, first_name, last_name, phone.",
          400
        )
      );
    } else if (e.code === "23505") {
      return next(new ExpressError("Username already exists.", 400));
    } else {
      return next(e);
    }
  }
});

module.exports = router;
