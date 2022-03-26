import express from "express";
import config from "config";
import csrf from "csurf";
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

  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      ...config.session.expressSession,
      store,
    })
  );

  app.use(csrf({ cookie: true }));

  app.use(passport.authenticate("session"));
}

export default app;
