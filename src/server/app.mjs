import express from "express";
import config from "config";
import cors from "cors";

import connect from "../db/connect.mjs";
import sessions from "./session.mjs";
import pagesAPI from "./api/pages.mjs";
import statics from "./statics.mjs";

const app = express();

if (config.cors?.enabled) app.use(cors(config.cors.options));

connect();

app.use(sessions);

app.use("/api/pages", pagesAPI);

app.use(statics);

export default app;
