import express from "express";

const StatitcRoutes = express();

const client = express.static("dist");
const assets = express.static("public");

StatitcRoutes.use(client, assets);
StatitcRoutes.use("*", client);

export default StatitcRoutes;
