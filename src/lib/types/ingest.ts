import { z } from "zod";

export enum IngestOpCode {
  // WebAnalytics = 0,
  WebVitals = 1,
}

export const webVitalsSchema = z.array(
  // TODO this will change once we implement the encryption part, this is simply for testing purposes
  z.object({
    delta: z.number(),
    id: z.string(),
    name: z.string(),
    navigationType: z.string(),
    rating: z.string(),
    value: z.number(),
    route: z.string(),
    timestamp: z.number(),
  })
);

export const ingestSchema = z.discriminatedUnion("op", [
  z.object({
    op: z.literal(IngestOpCode.WebVitals),
    d: webVitalsSchema,
  }),
]);
