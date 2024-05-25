import Stripe from "stripe";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import db from "@/server/db/drizzle";
import { stripe } from "@/lib/stripe";
import { userSubscription } from "@/server/db/schema";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (error: any) {
    return new NextResponse(`Webhook error: ${error.message}`, {
      status: 400,
    });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  // after successful completion of the subscription creation process
  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    if (!session?.metadata?.userId) {
      return new NextResponse("User ID is required", { status: 400 });
    }

    await db.insert(userSubscription).values({
      userId: session.metadata.userId,
      stripeSubscriptionId: subscription.id,
      stripeCustomerId: subscription.customer as string,

      // first item [0] in the array because only 1 item is defined in `line_items`
      stripePriceId: subscription.items.data[0].price.id,

      // convert Unix timestamp to JavaScript `Date` in ms
      stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
    });
  }

  // after successful completion of the subscription renewal process
  if (event.type === "invoice.payment_succeeded") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    await db
      .update(userSubscription)
      .set({
        // first item [0] in the array because only 1 item is defined in `line_items`
        stripePriceId: subscription.items.data[0].price.id,

        // convert Unix timestamp to JavaScript `Date` in ms
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      })
      .where(eq(userSubscription.stripeSubscriptionId, subscription.id));
  }

  return new NextResponse(null, { status: 200 });
}
