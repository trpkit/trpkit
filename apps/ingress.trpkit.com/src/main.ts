import { env } from "@/env";
import { isBadActor, loadBadActors } from "@/lib/bad-actors";
import eventRoutes from "@/routes/v1/event";
import bodyParser from "body-parser";
import cors from "cors";
import express, { type NextFunction, type Request, type Response } from "express";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const userAgent = req.headers["user-agent"];
  if (userAgent && isBadActor(userAgent)) {
    res.sendStatus(204);
  } else {
    next();
  }
});

// Routes
app.use("/v1/event", eventRoutes);

const PORT = env.PORT;

const server = app.listen(PORT, async () => {
  console.info(`Listening on port ${PORT}`);

  // Load bad actors
  await loadBadActors();
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
