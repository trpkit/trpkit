import { NextResponse } from "next/server";
import { Stripe } from "stripe";

import { stripe } from "../../../lib/stripe";

export async function POST(request: Request) {
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      await (await request.blob()).text(),
      request.headers.get("stripe-signature"),
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ message: `Webhook error: ${message}` }, { status: 400 });
  }

  const permittedEvents: string[] = [
    "checkout.session.completed",
    "payment_intent.succeeded",
    "payment_intent.payment_failed",
    "customer.subscription.updated",
    "customer.subscription.deleted",
  ];

  if (permittedEvents.includes(event.type)) {
    try {
      switch (event.type) {
        case "checkout.session.completed":
          // TODO: Handle event
          break;
        case "payment_intent.succeeded":
          // TODO: Handle event
          break;
        case "payment_intent.payment_failed":
          // TODO: Handle event
          break;
        case "customer.subscription.updated":
          // TODO: Handle event
          break;
        case "customer.subscription.deleted":
          // TODO: Handle event
          break;
        default:
          throw new Error(`Unhandled event: ${event.type}`);
      }
    } catch {
      return NextResponse.json({ message: "Webhook failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ message: "Received" }, { status: 200 });
}
