import express from "express";
import hbs from "hbs";

const StatitcRoutes = express();

StatitcRoutes.set("view engine", "html");
StatitcRoutes.engine("html", hbs.__express);
StatitcRoutes.set("views", `${process.cwd()}/dist`);

const client = express.static("dist");
const assets = express.static("public");

StatitcRoutes.use(assets, client);
StatitcRoutes.use("*", (req, res) => {
  return res.render(`index.html`, { csrf: req.csrfToken?.() });
});

export default StatitcRoutes;
