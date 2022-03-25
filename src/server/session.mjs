import express from "express";
import config from "config";
import passport from "passport";
import session from "express-session";
import mongoSession from "connect-mongodb-session";

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

  app.use(passport.authenticate("session"));
  app.use((req, res, next) => {
    var msgs = req.session.messages || [];
    res.locals.messages = msgs;
    res.locals.hasMessages = !!msgs.length;
    req.session.messages = [];
    next();
  });
}

export default app;
