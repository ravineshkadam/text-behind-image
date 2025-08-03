import { stripe } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Only create Supabase client if environment variables are available
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabaseAdmin = (supabaseUrl && supabaseServiceKey) 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

export async function POST(req: Request) {
  try {
    // Check if Stripe is configured
    if (!stripe) {
      return NextResponse.json(
        { error: "Payment processing is not configured. Please set up Stripe environment variables." },
        { status: 500 }
      );
    }

    // Check if Supabase is configured
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Database is not configured. Please set up Supabase environment variables." },
        { status: 500 }
      );
    }

    const { subscription_id } = await req.json();
    // Cancel the subscription on Stripe
    await stripe.subscriptions.cancel(subscription_id);

    // Update the Supabase row
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

    return NextResponse.json({ message: "Subscription cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling subscription:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}