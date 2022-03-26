import express from "express";
import config from "config";
import cors from "cors";
import cookies from "cookie-parser";

import connect from "../db/connect.mjs";
import sessions from "./session.mjs";
import auth, { ensureAuth } from "./auth.mjs";
import pagesAPI from "./api/pages.mjs";
import usersAPI from "./api/users.mjs";
import statics from "./statics.mjs";

const app = express();

connect();

if (config.cors?.enabled) app.use(cors(config.cors.options));
app.use(express.json());
app.use(cookies());

app.use(sessions);

app.use((req, res, next) => {
  if (config.debug) {
    const accepts = req.accepts(["html", "json"]);
    const isAjax = req.xhr || accepts === "json";
    console.log(`${req.method.toUpperCase()} ${req.url}`, {
      isAjax,
      // sesh: req.session,
      csrf: req.csrfToken?.(),
      user: req.session.passport?.user?.name,
    });
  }
  next();
});

app.use("/sign", auth);

app.use("/api/pages", pagesAPI);
app.use("/api/users", usersAPI);

app.get("/protected/*", ensureAuth);

app.use(statics);

export default app;
