import { stripe } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseAdmin = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
  ? createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL, 
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )
  : null;

export async function POST(req: Request) {
  try {
    // Check if Stripe is configured
    if (!stripe) {
      return NextResponse.json({ 
        error: "Stripe is not configured. Please set STRIPE_SECRET_KEY environment variable." 
      }, { status: 500 });
    }

    const { subscription_id } = await req.json();
    // Cancel the subscription on Stripe
    await stripe.subscriptions.cancel(subscription_id);

    // Update the Supabase row
    if (supabaseAdmin) {
      const { error } = await supabaseAdmin
        .from('profiles')
        .update({
          paid: false,
          subscription_id: null
        })
        .eq('subscription_id', subscription_id);

      if (error) {
        throw new Error(`Supabase update error: ${error.message}`);
      }
    }

    return NextResponse.json({ message: "Subscription cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling subscription:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}