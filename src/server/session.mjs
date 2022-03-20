import config from "config";
import mongoSession from "connect-mongodb-session";
import express from "express";
import session from "express-session";

const app = new express();

if (!config.session.mock) {
  const MongoStore = mongoSession(session);
  const store = new MongoStore({
    uri: config.mongo.uri,
    collection: config.mongo.sessionCollection,
    expires: config.session.expressSession.cookie.maxAge,
  });
  store.on("error", (err) => console.error(err));

  app.use(session({ ...config.session.expressSession, store }));
}

export default app;
