import { mongo } from "@trpkit/storage";
import { Request, Response, Router } from "express";
import { z } from "zod";

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
    .regex(
      /^trpkit\.naclbox\.([a-zA-Z0-9-_]{43}=?)\.([a-zA-Z0-9-_]{32})\.([a-zA-Z0-9-_]{22,}={0,2})$/
    ),
});

router.post("/:siteId", async (req: Request, res: Response) => {
  const siteId = req.params.siteId;
  const country = req.headers["cf-ipcountry"] as string | undefined;

  // Verify payload is in our format, we can change this to our regex in the future
  const payloadResult = payloadSchema.safeParse(req.body);

  if (!payloadResult.success) {
    res.sendStatus(204);
    return;
  }

  const { payload } = payloadResult.data;

  // Check the origin and drop any localhost requests
  const origin = req.headers["origin"];
  if (origin && origin.match(/^http(s)?:\/\/(localhost|127\.0\.0\.1)/)) {
    res.sendStatus(204);
    return;
  }

  // TODO validation if siteId exists in our system

  const event: IncomingEvent = {
    siteId,
    payload,
    received: new Date(),
    // unknown if cf doesn't report country, or self-hosted
    // and not routing traffic through cloudflare
    country: country || "unknown",
  };

  const client = await mongo();
  const db = client.db(process.env.MONGO_DATABASE);

  // insert incoming event
  await db.collection("events").insertOne(event);

  res.sendStatus(204);
});

router.get("/:siteId", (req: Request, res: Response) => {
  const siteId = req.params.siteId;
  const payload = req.query.payload as string;
  const country = req.headers["cf-ipcountry"];

  console.log(siteId, payload, country);

  res.set("Cache-Control", "private, no-cache, proxy-revalidate");
  res.sendStatus(204);
});

export default router;
