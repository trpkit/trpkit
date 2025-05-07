import { IngestOpCode, ingestSchema } from "@/lib/types/ingest";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const rawBody = await req.json();
  const parsedBody = ingestSchema.safeParse(rawBody);

  if (!parsedBody.success) {
    return new NextResponse("Invalid payload", { status: 400 });
  }

  const body = parsedBody.data;

  switch (body.op) {
    case IngestOpCode.WebVitals: {
      console.log("Received web vitals:", body.d);
      return new NextResponse(null, { status: 200 });
    }
    default: {
      // This code should be unreachable
      // If new OpCodes are added without implementation, this will return a 400 error
      return new NextResponse("Invalid operation", { status: 400 });
    }
  }
}
