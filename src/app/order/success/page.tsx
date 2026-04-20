'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { useCartStore } from '@/store/cart';

export default function OrderSuccessPage() {
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    // Clear the cart after successful order
    clearCart();
  }, [clearCart]);

  return (
    <div className="py-24 sm:py-32">
      <div className="max-w-lg mx-auto px-4 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-16 h-16 text-olive" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-light text-charcoal mb-4">
          Thank you for your order!
        </h1>

        <p className="text-olive mb-8">
          We have received your order and will begin processing it shortly.
          You will receive a confirmation email with your order details and
          tracking information once your prints are on their way.
        </p>

        <div className="bg-sand/20 p-6 mb-8 text-left">
          <h2 className="font-medium text-charcoal mb-4">What happens next?</h2>
          <ul className="space-y-3 text-sm text-olive">
            <li className="flex items-start">
              <span className="w-6 h-6 bg-charcoal text-cream rounded-full flex items-center justify-center text-xs mr-3 flex-shrink-0">
                1
              </span>
              Your order is sent to our print partner
            </li>
            <li className="flex items-start">
              <span className="w-6 h-6 bg-charcoal text-cream rounded-full flex items-center justify-center text-xs mr-3 flex-shrink-0">
                2
              </span>
              Your prints are produced with care on premium paper
            </li>
            <li className="flex items-start">
              <span className="w-6 h-6 bg-charcoal text-cream rounded-full flex items-center justify-center text-xs mr-3 flex-shrink-0">
                3
              </span>
              Shipped directly to you within 5-7 business days
            </li>
          </ul>
        </div>

        <Link
          href="/shop"
          className="inline-flex items-center px-8 py-3 bg-charcoal text-cream text-sm tracking-wide hover:bg-olive transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
