import "dotenv/config";

import app from "./src/server/app.mjs";

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
