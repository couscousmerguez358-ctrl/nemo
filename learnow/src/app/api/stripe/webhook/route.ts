import { NextResponse, type NextRequest } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

// Lazy-loaded Stripe singleton to prevent build-time crashes when secret keys are undefined
let stripeInstance: Stripe | null = null;
function getStripe(): Stripe {
  if (!stripeInstance) {
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY || "dummy_key", {
      apiVersion: "2023-10-16",
    });
  }
  return stripeInstance;
}

// Lazy-loaded Supabase admin client singleton
let supabaseAdminInstance: any = null;
function getSupabaseAdmin() {
  if (!supabaseAdminInstance) {
    supabaseAdminInstance = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dummy.supabase.co",
      process.env.SUPABASE_SERVICE_ROLE_KEY || "dummy_service_role"
    );
  }
  return supabaseAdminInstance;
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const stripe = getStripe();
  const supabaseAdmin = getSupabaseAdmin();
  let event: Stripe.Event;

  try {
    // Validate signature
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || "dummy_webhook_secret"
    );
  } catch (err: any) {
    console.error(`[Stripe Webhook Error] ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle billing events transactionally
  const session = event.data.object as any;

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const userId = session.metadata?.userId;
        const plan = session.metadata?.plan; // pro, expert
        const billingCycle = session.metadata?.billingCycle; // monthly, annual
        const stripeCustomerId = session.customer;
        const stripeSubscriptionId = session.subscription;

        if (!userId) {
          throw new Error("Missing userId in checkout session metadata");
        }

        // Retrieve subscription info to get period end
        const subscription = await stripe.subscriptions.retrieve(stripeSubscriptionId);

        // Update public.subscriptions table. (Triggers Postgres JWT claim sync automatically!)
        const { error } = await supabaseAdmin
          .from("subscriptions")
          .update({
            stripe_customer_id: stripeCustomerId,
            stripe_subscription_id: stripeSubscriptionId,
            plan,
            billing_cycle: billingCycle,
            status: "active",
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("user_id", userId);

        if (error) throw error;
        break;
      }

      case "invoice.payment_succeeded": {
        // Renewal succeeded
        if (session.subscription) {
          const subscription = await stripe.subscriptions.retrieve(session.subscription);
          
          const { error } = await supabaseAdmin
            .from("subscriptions")
            .update({
              status: "active",
              current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
              updated_at: new Date().toISOString(),
            })
            .eq("stripe_subscription_id", session.subscription);

          if (error) throw error;
        }
        break;
      }

      case "invoice.payment_failed":
      case "customer.subscription.deleted": {
        // Payment failed or subscription cancelled
        const stripeSubId = session.id || session.subscription;

        if (stripeSubId) {
          // Revert subscription status to none/canceled (Triggers RLS JWT claim back to false!)
          const { error } = await supabaseAdmin
            .from("subscriptions")
            .update({
              status: "canceled",
              updated_at: new Date().toISOString(),
            })
            .eq("stripe_subscription_id", stripeSubId);

          if (error) throw error;
        }
        break;
      }

      default:
        console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error(`[Webhook Sync DB Error] ${err.message}`);
    return NextResponse.json({ error: "Failed to sync database" }, { status: 500 });
  }
}
