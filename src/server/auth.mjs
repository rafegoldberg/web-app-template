/**
 * @link https://github.com/passport/todos-express-password/blob/master/routes/auth.js
 */
import express from "express";
import crypto from "crypto";
import passport from "passport";
import LocalStrategy from "passport-local";

import User from "../db/models/user.mjs";

/* Configure password authentication strategy.
 *
 * The `LocalStrategy` authenticates users by verifying a username and password.
 * The strategy parses the username and password from the request and calls the
 * `verify` function.
 *
 * The `verify` function queries the database for the user record and verifies
 * the password by hashing the password supplied by the user and comparing it to
 * the hashed password stored in the database. If the comparison succeeds, the
 * user is authenticated; otherwise, not.
 */
passport.use(
  new LocalStrategy(async function verifyUser(username, password, next) {
    const user = await User.findOne({ username });
    console.log("PASSPORT AUTH MIDDLEWARE", { user });

    if (!user)
      return next(null, false, {
        message: "Wrong username or password.",
      });

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
 *
 * When a login session is established, information about the user will be
 * stored in the session. This information is supplied by the `serializeUser`
 * function, which is yielding the user ID and username.
 *
 * As the user interacts with the app, subsequent requests will be authenticated
 * by verifying the session. The same user information that was serialized at
 * session establishment will be restored when the session is authenticated by
 * the `deserializeUser` function.
 *
 * Since every request to the app needs the user ID and username, in order to
 * fetch todo records and render the user element in the navigation bar, that
 * information is stored in the session.
 */
passport.serializeUser((user, next) => {
  process.nextTick(() => {
    next(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser((user, next) => {
  process.nextTick(() => next(null, user));
});

const app = new express();

/* POST /sign/in
 * This route authenticates the user by verifying a username and password.
 *
 * A username and password are submitted to this route via an HTML form, which
 * was rendered by the `GET /login` route. The username and password is
 * authenticated using the `local` strategy. The strategy will parse the
 * username and password from the request and call the `verify` function.
 *
 * Upon successful authentication, a login session will be established. As the
 * user interacts with the app, by clicking links and submitting forms, the
 * subsequent requests will be authenticated by verifying the session.
 *
 * When authentication fails, the user will be re-prompted to login and shown
 * a message informing them of what went wrong.
 */
app.post(
  "/in",
  passport.authenticate("local", {
    successReturnToOrRedirect: "/",
    failureRedirect: "/signin",
    failureMessage: true,
  })
);

/* POST /sign/out
 * This route logs the user out.
 */
app.post("/out", (req, res) => {
  req.logout();
  res.redirect("/");
});

/* POST /sign/up
 * This route creates a new user account.
 *
 * A username and password are submitted to this route via a POST request.
 * The password is hashed and salted, and the new user record is inserted
 * into the database. If the user's correctly created, they get logged in.
 */
app.post("/up", async ({ body }, res) => {
  const user = new User(body);
  try {
    const saved = await user.save();
    return res.json(saved);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default app;
