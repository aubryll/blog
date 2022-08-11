#!/usr/bin/env node
/* eslint-disable no-console */

import { createServer } from "http";
const app = require("../src/api");

function onError(error) {
  console.error(`Failed to start server:\n${error.stack}`);
  process.exit(1);
}

async function main() {
  const port = Number(process.env.PORT || "3001");
  app.set("port", port);
  const server = createServer(app);
  server.listen(port);

  server.on("error", onError);

  server.on("listening", () => {
    const addr = server.address();
    const bind =
      typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
    console.log(`Listening on ${bind}`);
  });
}

main();