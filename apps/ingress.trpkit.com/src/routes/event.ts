import { mongo } from "@trpkit/storage";
import { type Request, type Response, Router } from "express";
import { z } from "zod";
import { env } from "../env";

const router = Router();

type IncomingEvent = {
  siteId: string;
  payload: string;
  received: Date;
  country: string;
};

const payloadSchema = z.object({
  payload: z
    .string()
    .regex(/^trpkit\.box\.([a-zA-Z0-9-_]{43}=?)\.([a-zA-Z0-9-_]{32})\.([a-zA-Z0-9-_]{22,}={0,2})$/),
});

function isOriginLocalhost(origin: string | undefined): boolean {
  return !!origin?.match(/^http(s)?:\/\/(localhost|127\.0\.0\.1)/);
}

async function insertIncomingPayload(siteId: string, payload: string, country: string | undefined) {
  const event: IncomingEvent = {
    siteId,
    payload,
    received: new Date(),
    // "unknown" if IP is not in Cloudflare dataset or
    // application is being self-hosted
    country: country || "unknown",
  };

  const client = await mongo();
  const db = client.db(env.MONGO_DATABASE);

  // insert incoming event
  await db.collection("events").insertOne(event);
}

router.post("/:siteId", async (req: Request, res: Response) => {
  const siteId = req.params.siteId;
  const country = req.headers["cf-ipcountry"] as string | undefined;

  const payloadResult = payloadSchema.safeParse(req.body);

  if (!payloadResult.success) {
    res.sendStatus(204);
    return;
  }

  const { payload } = payloadResult.data;

  // Check the origin and drop any localhost requests
  const origin = req.headers.origin;
  if (isOriginLocalhost(origin)) {
    res.sendStatus(204);
    return;
  }

  // TODO validate if siteId exists in our system

  // TODO validate if site origins match incoming origin

  // TODO validate if site is over payload threshold

  await insertIncomingPayload(siteId, payload, country);

  res.sendStatus(204);
});

router.get("/:siteId", async (req: Request, res: Response) => {
  const siteId = req.params.siteId;
  const country = req.headers["cf-ipcountry"] as string | undefined;

  const payloadResult = payloadSchema.safeParse(req.body);

  if (!payloadResult.success) {
    res.sendStatus(204);
    return;
  }

  const { payload } = payloadResult.data;

  // Check the origin and drop any localhost requests
  const origin = req.headers.origin;
  if (isOriginLocalhost(origin)) {
    res.sendStatus(204);
    return;
  }

  // TODO validate if siteId exists in our system

  // TODO validate if site origins match incoming origin

  // TODO validate if site is over payload threshold

  await insertIncomingPayload(siteId, payload, country);

  // We don't want the user catching the response
  res.set("Cache-Control", "private, no-cache, proxy-revalidate");
  res.sendStatus(204);
});

export default router;
