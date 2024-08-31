import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { env } from "./env";
import { errorHandler } from "./middlewares/errorHandler";
import auth from "./routes/v1/auth";

const app = express();

// Middlewares
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || env.ALLOWED_ORIGINS.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/v1/auth", auth);

// Error-handling middleware
app.use(errorHandler);

const server = app.listen(env.PORT, async () => {
  console.info(`Listening on port ${env.PORT}`);
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
