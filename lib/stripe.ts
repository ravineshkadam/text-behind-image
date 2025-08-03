import Stripe from "stripe";

// Only initialize Stripe if the secret key is available
// This prevents build errors when environment variables aren't set
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

export const stripe = stripeSecretKey 
  ? new Stripe(stripeSecretKey, {
      apiVersion: "2024-10-28.acacia"
    })
  : null;