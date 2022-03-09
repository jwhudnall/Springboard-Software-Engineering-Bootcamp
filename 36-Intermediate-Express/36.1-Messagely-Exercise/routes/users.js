const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError");
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require("../config");
const { ensureCorrectUser, ensureLoggedIn } = require("../middleware/auth");
const User = require("../models/user");

/** GET / - get list of users.
 *
 * => {users: [{username, first_name, last_name, phone}, ...]}
 *
 **/
router.get("/", ensureLoggedIn, async (req, res, next) => {
  try {
    const users = await User.all();
    return res.json({ users });
  } catch (e) {
    return next(e);
  }
});

/** GET /:username - get detail of users.
 *
 * => {user: {username, first_name, last_name, phone, join_at, last_login_at}}
 *
 **/
router.get("/:username", ensureCorrectUser, async (req, res, next) => {
  try {
    const user = await User.get(req.params.username);
    return res.json({ user });
  } catch (e) {
    return next(e);
  }
});

/** GET /:username/to - get messages to user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 from_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/
router.get("/:username/to", ensureCorrectUser, async (req, res, next) => {
  try {
    const user = await User.get(req.params.username);
    const messages = await User.messagesTo(user.username);
    return res.json({ messages });
  } catch (e) {
    return next(e);
  }
});

/** GET /:username/from - get messages from user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 to_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/
router.get("/:username/from", ensureCorrectUser, async (req, res, next) => {
  try {
    const user = await User.get(req.params.username);
    const messages = await User.messagesFrom(user.username);
    return res.json({ messages });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
