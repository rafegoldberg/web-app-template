import express from "express";
import User from "../../db/models/user.mjs";

const app = new express();

app.get("/:username", async ({ params = {}, query = {} }, res) => {
  const user = await User.findOne({ ...query, username: params.username });
  return res.json(user);
});

app.put("/:username", async ({ params = {}, query = {}, ...req }, res) => {
  const update = await User.updateOne({ ...query, username: params.username });
  return res.json(update);
});

export default app;
