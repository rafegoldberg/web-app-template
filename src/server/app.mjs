import express from "express";
import config from "config";
import cors from "cors";

import connect from "../db/connect.mjs";
import sessions from "./session.mjs";
import auth, { ensureAuth } from "./auth.mjs";
import pagesAPI from "./api/pages.mjs";
import usersAPI from "./api/users.mjs";
import statics from "./statics.mjs";

const app = express();

app.use(express.json());

if (config.cors?.enabled) app.use(cors(config.cors.options));

connect();

app.use(sessions);
app.use("/sign", auth);

app.use("/api/pages", pagesAPI);
app.use("/api/users", usersAPI);

app.get("/protected/*", ensureAuth);

app.use(statics);

export default app;
