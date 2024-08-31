import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { env } from "./env";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = env.PORT;

const server = app.listen(PORT, async () => {
  console.info(`Listening on port ${PORT}`);
});

function shutdown(signal: "SIGTERM" | "SIGINT") {
  console.info(`Received ${signal}. Shutting down`);
  // Gracefully shutdown server
  server.close();
  // Exit process
  process.exit(0);
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
