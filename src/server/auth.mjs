/**
 * @link https://github.com/passport/todos-express-password/blob/master/routes/auth.js
 */
import express from "express";
import config from "config";
import crypto from "crypto";
import passport from "passport";
import LocalStrategy from "passport-local";
import { ensureLoggedIn } from "connect-ensure-login";

import User from "../db/models/user.mjs";

const app = new express();

/**AUTHENTICATION MIDDLEWARES
 */
// export const ensureAuth = ensureLoggedIn(config.paths.login);
export const ensureAuth = (req, res, next) => {
  // console.log({
  //   req: Object.keys(req),
  //   res: Object.keys(res),
  // });
  next();
};

const getClientUserSession = (req, res) => {
  const {
    passport: { user = {} },
    returnTo: redirect = "/",
  } = req.session || {};
  // console.log("getClientUserSession", {
  //   req: { isAuthenticated: req.isAuthenticated },
  //   sesh: req.session,
  //   authInfo: req.authInfo,
  //   set: req.session.set,
  // });
  return res.json({ user, redirect });
};

/**AUTHENTICATION CONFIGURATION
 */
/* Set up Passport for password-based auth.
 */
passport.use(
  new LocalStrategy(async function verifyUser(username, password, next) {
    // console.log(username, password);
    const user = await User.findOne({ username });
    if (!user)
      return next(null, false, { message: "Incorrect username and password." });

    crypto.pbkdf2(
      password,
      user.salt,
      310000,
      32,
      "sha256",
      function (err, hashed) {
        if (err) return next(err);
        if (!crypto.timingSafeEqual(user.password, hashed)) {
          return next(null, false, {
            message: "Incorrect username or password.",
          });
        }
        return next(null, user);
      }
    );
  })
);

/* Configure session management.
 */
passport.serializeUser((user, next) => {
  process.nextTick(() => {
    next(null, {
      id: user.id,
      username: user.username,
      name: user.name,
    });
  });
});

passport.deserializeUser((user, next) => {
  process.nextTick(() => next(null, user));
});

/**AUTHENTICATION ROUTES
 */
/* Sign In
 */
app.post("/in", passport.authenticate("local"), getClientUserSession);

/* Sign Out
 * This route logs the user out.
 */
app.all("/out", (req, res) => {
  req.logout();
  res.redirect("/");
});

/* Sign Up
 * Create a new user account.
 */
app.post("/up", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    req.login(user, (e) => {
      if (e) return res.status(400).json({ error: e });
      return getClientUserSession(req, res);
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default app;
