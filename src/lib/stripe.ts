import Stripe from 'stripe';
import { getServiceSupabase } from './supabase';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
  typescript: true,
});

export const getOrCreateStripeCustomer = async ({ email, uuid }: { email: string; uuid: string }) => {
  const supabase = getServiceSupabase();

  // Get user from Supabase
  const { data: user } = await supabase
    .from('mark_users')
    .select('stripe_customer_id')
    .eq('id', uuid)
    .single();

  if (user?.stripe_customer_id) {
    return user.stripe_customer_id;
  }

  // Create new customer in Stripe
  const customer = await stripe.customers.create({
    email,
    metadata: {
      supabaseUUID: uuid,
    },
  });

  // Update user in Supabase with Stripe customer ID
  await supabase
    .from('mark_users')
    .update({
      stripe_customer_id: customer.id,
    })
    .eq('id', uuid);

  return customer.id;
};

export const createStripeCheckoutSession = async ({
  customerId,
  priceId,
  successUrl,
  cancelUrl,
}: {
  customerId: string;
  priceId: string;
  successUrl: string;
  cancelUrl: string;
}) => {
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    subscription_data: {
      metadata: {
        payingUserId: customerId,
      },
    },
  });

  return session;
};

export const createBillingPortalSession = async ({
  customerId,
  returnUrl,
}: {
  customerId: string;
  returnUrl: string;
}) => {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });

  return session;
}; 