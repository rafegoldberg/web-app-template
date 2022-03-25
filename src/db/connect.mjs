import config from "config";
import m from "mongoose";

const { NODE_ENV: env = "development" } = process.env;

if (config.debug) {
  m.connection.on("connected", () => console.log("DB Connected"));
  m.connection.on("disconnected", () => console.log("DB Disconnected"));
  m.connection.on("error", (err) => console.error(err));
}

export const disconnect = m.disconnect;

export const connect = () => {
  m.set("debug", config.debug || config.mongo.debug);
  return m.connect(config.mongo.uri, {
    autoIndex: true,
    autoCreate: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default connect;