const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError");
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require("../config");
const { ensureCorrectUser, ensureLoggedIn } = require("../middleware/auth");
const Message = require("../models/message");

/** GET /:id - get detail of message.
 *
 * => {message: {id,
 *               body,
 *               sent_at,
 *               read_at,
 *               from_user: {username, first_name, last_name, phone},
 *               to_user: {username, first_name, last_name, phone}}
 *
 * Make sure that the currently-logged-in users is either the to or from user.
 *
 **/
router.get("/:id", ensureLoggedIn, async (req, res, next) => {
  try {
    const username = req.user.username;
    const message = await Message.get(req.params.id);
    if (message.to_user.username === username || message.from_user.username === username) {
      return res.json({ message });
    }
    throw new ExpressError("Not authorized to view message.", 401);
  } catch (e) {
    return next(e);
  }
});

/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 **/
router.post("/", ensureLoggedIn, async (req, res, next) => {
  try {
    const { to_username, body } = req.body;
    if (!to_username || !body) {
      throw new ExpressError("Missing one or more request args: to_username, body", 400);
    }
    const message = await Message.create({
      from_username: req.user.username,
      to_username,
      body
    });

    return res.status(201).json({ message });
  } catch (e) {
    if (e.code === "23503") {
      return next(new ExpressError(`Requested message recipient not found`, 400));
    }
    return next(e);
  }
});

/** POST/:id/read - mark message as read:
 *
 *  => {message: {id, read_at}}
 *
 * Make sure that the only the intended recipient can mark as read.
 *
 **/
router.post("/:id/read", ensureLoggedIn, async (req, res, next) => {
  try {
    const username = req.user.username;
    let message = await Message.get(req.params.id);
    debugger;
    if (message.to_user.username !== username) {
      throw new ExpressError("You don't have authorization to do that.", 401);
    }
    message = await Message.markRead(req.params.id);
    return res.json({ message });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
