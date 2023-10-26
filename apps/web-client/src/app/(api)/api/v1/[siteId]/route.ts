import { NextRequest } from "next/server";

import { mongo } from "@trpkit/storage";
import { boxMessageRegex } from "@trpkit/tracker-crypto";

interface RouteParameters {
  params: {
    version: string;
    siteId: string;
  };
}

function checkPayload(payload: string) {
  return boxMessageRegex.test(payload);
}

export async function GET(request: NextRequest, { params }: RouteParameters) {
  if (!request.nextUrl.searchParams.has("p")) {
    // Drop request early
    return new Response(null, {
      status: 204,
      headers: {
        "cache-control": "private, no-cache, proxy-revalidate",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST",
      },
    });
  }

  const siteId = params.siteId;
  const country = request.headers.get("cf-ipcountry");
  const payload = request.nextUrl.searchParams.get("p");

  if (!checkPayload(payload!)) {
    // Drop request
    return new Response(null, {
      status: 204,
      headers: {
        "cache-control": "private, no-cache, proxy-revalidate",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST",
      },
    });
  }

  // TODO: Retrieve the project origins and validate the origin of the request

  const now = Date.now();
  // TODO: Create a type for this, preferably in a separate package
  const incomingPayload = {
    siteId,
    payload,
    received: now,
    country,
  };

  const client = await mongo();
  const db = client.db(process.env.MONGO_DATABASE);

  // This is a time series collection
  await db.collection("payload").insertOne(incomingPayload);

  return new Response(null, {
    status: 201,
    headers: {
      "cache-control": "private, no-cache, proxy-revalidate",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST",
    },
  });
}

export async function POST(request: NextRequest, { params }: RouteParameters) {
  const siteId = params.siteId;
  const country = request.headers.get("cf-ipcountry");
  const payload = await request.text();

  if (!checkPayload(payload)) {
    // Drop request
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST",
      },
    });
  }

  // TODO: Retrieve the project origins and validate the origin of the request

  const now = Date.now();
  // TODO: Create a type for this, preferably in a separate package
  const incomingPayload = {
    siteId,
    payload,
    received: now,
    country,
  };

  const client = await mongo();
  const db = client.db(process.env.MONGO_DATABASE);

  // This is a time series collection
  await db.collection("payload").insertOne(incomingPayload);

  return new Response(null, {
    status: 201,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST",
    },
  });
}
