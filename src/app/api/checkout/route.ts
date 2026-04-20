import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

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
  try {
    const { items, customerEmail } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items in cart' },
        { status: 400 }
      );
    }

    // Create line items for Stripe
    const lineItems = items.map((item: {
      title: string;
      size: string;
      framed: boolean;
      price: number;
      quantity: number;
    }) => ({
      price_data: {
        currency: 'dkk',
        product_data: {
          name: item.title,
          description: `${item.size}${item.framed ? ' - With oak frame' : ' - Without frame'}`,
        },
        unit_amount: item.price * 100, // Stripe expects amount in øre
      },
      quantity: item.quantity,
    }));

    // Calculate if free shipping applies
    const subtotal = items.reduce(
      (sum: number, item: { price: number; quantity: number }) =>
        sum + item.price * item.quantity,
      0
    );

    const shippingCost = subtotal >= 499 ? 0 : 39;

    if (shippingCost > 0) {
      lineItems.push({
        price_data: {
          currency: 'dkk',
          product_data: {
            name: 'Shipping',
            description: 'Standard shipping to Denmark',
          },
          unit_amount: shippingCost * 100,
        },
        quantity: 1,
      });
    }

    // Create Stripe checkout session
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
      customer_email: customerEmail,
      shipping_address_collection: {
        allowed_countries: ['DK', 'SE', 'NO', 'DE', 'NL', 'BE', 'FR'],
      },
      metadata: {
        order_items: JSON.stringify(items.map((item: {
          productId: string;
          size: string;
          framed: boolean;
          quantity: number;
        }) => ({
          productId: item.productId,
          size: item.size,
          framed: item.framed,
          quantity: item.quantity,
        }))),
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    );
  }
}
