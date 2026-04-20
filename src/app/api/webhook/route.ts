import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createOrder } from '@/lib/printify';

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }
  return new Stripe(key, {
    apiVersion: '2026-03-25.dahlia',
  });
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing signature' },
      { status: 400 }
    );
  }

  if (!webhookSecret) {
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 500 }
    );
  }

  const stripe = getStripe();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      await handleSuccessfulPayment(session, stripe);
      break;
    }
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

async function handleSuccessfulPayment(session: Stripe.Checkout.Session, stripe: Stripe) {
  const shopId = process.env.PRINTIFY_SHOP_ID;

  if (!shopId) {
    console.log('No Printify shop ID configured - skipping order creation');
    return;
  }

  try {
    // Retrieve full session with expanded shipping details
    const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ['shipping_details', 'customer_details'],
    });

    // Access shipping via collected_information for newer API versions
    const shippingAddress = fullSession.collected_information?.shipping_details?.address;
    const shippingName = fullSession.collected_information?.shipping_details?.name;
    const customerEmail = fullSession.customer_details?.email;
    const customerPhone = fullSession.customer_details?.phone;

    if (!shippingAddress) {
      throw new Error('Missing shipping address');
    }

    // Parse order items from metadata
    const orderItems = JSON.parse(session.metadata?.order_items || '[]');

    if (orderItems.length === 0) {
      throw new Error('No items in order');
    }

    // Create line items for Printify
    const lineItems = orderItems.map((item: {
      productId: string;
      size: string;
      framed: boolean;
      quantity: number;
      printifyProductId?: string;
      printifyVariantId?: number;
    }) => ({
      product_id: item.printifyProductId || item.productId,
      variant_id: item.printifyVariantId || 1,
      quantity: item.quantity,
    }));

    // Create order in Printify
    const printifyOrder = await createOrder(shopId, {
      external_id: session.id,
      label: `Order ${session.id.slice(-8)}`,
      line_items: lineItems,
      shipping_method: 1,
      send_shipping_notification: true,
      address_to: {
        first_name: shippingName?.split(' ')[0] || '',
        last_name: shippingName?.split(' ').slice(1).join(' ') || '',
        email: customerEmail || '',
        phone: customerPhone || '',
        country: shippingAddress.country || 'DK',
        region: shippingAddress.state || '',
        address1: shippingAddress.line1 || '',
        address2: shippingAddress.line2 || undefined,
        city: shippingAddress.city || '',
        zip: shippingAddress.postal_code || '',
      },
    });

    console.log('Printify order created:', printifyOrder.id);
  } catch (error) {
    console.error('Error creating Printify order:', error);
  }
}
