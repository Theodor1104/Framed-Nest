'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, X, Loader2, ShoppingBag, ArrowRight, Truck, Shield } from 'lucide-react';
import { useCartStore } from '@/store/cart';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const subtotal = getTotal();
  const freeShippingThreshold = 499;
  const shippingCost = 39;
  const shipping = items.length > 0 && subtotal < freeShippingThreshold ? shippingCost : 0;
  const total = subtotal + shipping;
  const progressToFreeShipping = Math.min((subtotal / freeShippingThreshold) * 100, 100);

  const handleCheckout = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.productId,
            title: item.title,
            size: item.size,
            framed: item.framed,
            price: item.price,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveItem = (id: string) => {
    setRemovingId(id);
    setTimeout(() => {
      removeItem(id);
      setRemovingId(null);
    }, 300);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-24 px-4">
        <div className="w-20 h-20 rounded-full bg-sand/30 flex items-center justify-center mb-6">
          <ShoppingBag className="w-10 h-10 text-olive/50" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-light text-charcoal mb-4">
          Your cart is empty
        </h1>
        <p className="text-olive mb-8 text-center max-w-md">
          Discover our curated collection of premium art prints, designed for modern, sophisticated spaces.
        </p>
        <Link
          href="/shop"
          className="group inline-flex items-center px-8 py-4 bg-charcoal text-cream text-sm tracking-widest uppercase hover:bg-olive transition-colors"
        >
          Start Shopping
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl sm:text-3xl font-light text-charcoal">
            Shopping Cart
          </h1>
          <span className="text-sm text-olive">
            {items.reduce((sum, item) => sum + item.quantity, 0)} item{items.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Free shipping progress */}
        {subtotal < freeShippingThreshold && (
          <div className="mb-8 p-4 bg-sand/20 rounded-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-sm text-charcoal">
                <Truck className="w-4 h-4" />
                <span>
                  Add <strong>{freeShippingThreshold - subtotal} kr</strong> more for free shipping
                </span>
              </div>
              <span className="text-xs text-olive">{Math.round(progressToFreeShipping)}%</span>
            </div>
            <div className="h-1.5 bg-sand/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-charcoal rounded-full transition-all duration-500"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className={`flex gap-4 sm:gap-6 p-4 sm:p-6 bg-white border border-sand/30 transition-all duration-300 ${
                  removingId === item.id ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                }`}
              >
                {/* Product Image */}
                <Link
                  href={`/product/${item.productId}`}
                  className="w-24 sm:w-32 aspect-[3/4] bg-sand/30 flex-shrink-0 overflow-hidden relative group"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="128px"
                  />
                </Link>

                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start">
                    <div>
                      <Link
                        href={`/product/${item.productId}`}
                        className="font-medium text-charcoal hover:text-olive transition-colors"
                      >
                        {item.title}
                      </Link>
                      <p className="text-sm text-olive mt-1">
                        {item.size}
                        {item.framed && (
                          <span className="inline-flex items-center ml-2 px-2 py-0.5 bg-sand/30 text-xs rounded">
                            Framed
                          </span>
                        )}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="p-1.5 text-olive hover:text-charcoal hover:bg-sand/30 rounded transition-colors"
                      aria-label="Remove item"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex justify-between items-end mt-auto pt-4">
                    {/* Quantity */}
                    <div className="flex items-center border border-sand bg-white">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 text-olive hover:text-charcoal hover:bg-sand/20 transition-colors disabled:opacity-50"
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-4 text-sm font-medium text-charcoal min-w-[40px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 text-olive hover:text-charcoal hover:bg-sand/20 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="font-medium text-charcoal">
                        {item.price * item.quantity} kr
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-xs text-olive mt-0.5">
                          {item.price} kr each
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-sand/10 p-6 border border-sand/30">
              <h2 className="text-lg font-medium text-charcoal mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-olive">Subtotal</span>
                  <span className="text-charcoal font-medium">{subtotal} kr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-olive">Shipping</span>
                  <span className={`font-medium ${shipping === 0 ? 'text-green-600' : 'text-charcoal'}`}>
                    {shipping === 0 ? 'Free' : `${shipping} kr`}
                  </span>
                </div>
              </div>

              <div className="border-t border-sand/50 mt-4 pt-4">
                <div className="flex justify-between text-lg font-medium">
                  <span className="text-charcoal">Total</span>
                  <span className="text-charcoal">{total} kr</span>
                </div>
                <p className="text-xs text-olive mt-1">Including VAT</p>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full mt-6 py-4 bg-charcoal text-cream text-sm tracking-widest uppercase hover:bg-olive transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Proceed to Checkout
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <Link
                href="/shop"
                className="block text-center text-sm text-olive hover:text-charcoal mt-4 transition-colors"
              >
                Continue Shopping
              </Link>

              {/* Trust badges */}
              <div className="mt-8 pt-6 border-t border-sand/50 space-y-3">
                <div className="flex items-center gap-3 text-sm text-olive">
                  <Shield className="w-4 h-4 flex-shrink-0" />
                  <span>Secure payment with Stripe</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-olive">
                  <Truck className="w-4 h-4 flex-shrink-0" />
                  <span>Free shipping over {freeShippingThreshold} kr</span>
                </div>
                <p className="text-xs text-olive/70 pl-7">
                  Estimated delivery: 5-7 business days
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
