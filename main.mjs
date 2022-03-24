import "dotenv/config";
import config from "config";

import app from "./src/server/app.mjs";

const { PORT } = process.env;

app.listen(PORT, () => {
  if (config.logs) {
    console.log();
    console.log(`┌[SERVER STARTED]`);
    console.log(`└>Listening on: http://localhost:${PORT}`);
    console.log();
  }
});
