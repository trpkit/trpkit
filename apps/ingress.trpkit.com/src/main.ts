import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import express, { type NextFunction, type Request, type Response } from "express";
import { isBadActor, loadBadActors } from "./lib/bad-actors";
import eventRoutes from "./routes/event";

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

// TODO consider versioning the routes, aka /v1/[ROUTE]
// Routes
app.use("/event", eventRoutes);

const PORT = process.env.PORT || 4000;

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
