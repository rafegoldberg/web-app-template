import express from "express";

const StatitcRoutes = express();

const client = express.static("dist");
const assets = express.static("public");

StatitcRoutes.use(assets, client);
StatitcRoutes.use("*", client);

export default StatitcRoutes;
