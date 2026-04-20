'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Check, ShoppingBag } from 'lucide-react';
import { useCartStore, CartItem } from '@/store/cart';

export default function CartNotification() {
  const [show, setShow] = useState(false);
  const [lastItem, setLastItem] = useState<CartItem | null>(null);
  const items = useCartStore((state) => state.items);

  useEffect(() => {
    if (items.length > 0) {
      const newest = items[items.length - 1];
      if (!lastItem || newest.id !== lastItem.id || newest.quantity !== lastItem.quantity) {
        // Check if it's actually a new item being added (not just quantity change)
        const previousItem = lastItem;
        setLastItem(newest);

        if (!previousItem || newest.id !== previousItem.id) {
          setShow(true);
          const timer = setTimeout(() => setShow(false), 4000);
          return () => clearTimeout(timer);
        }
      }
    }
  }, [items, lastItem]);

  if (!show || !lastItem) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
      <div className="bg-white shadow-2xl border border-sand/30 p-4 max-w-sm">
        <div className="flex items-start gap-4">
          {/* Checkmark */}
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
            <Check className="w-4 h-4 text-green-600" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-charcoal mb-1">Added to cart</p>
            <div className="flex gap-3">
              <div className="w-12 h-16 bg-sand/30 flex-shrink-0 overflow-hidden relative">
                <Image
                  src={lastItem.image}
                  alt={lastItem.title}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div className="min-w-0">
                <p className="text-sm text-charcoal truncate">{lastItem.title}</p>
                <p className="text-xs text-olive">{lastItem.size}</p>
                <p className="text-sm font-medium text-charcoal mt-1">{lastItem.price} kr</p>
              </div>
            </div>

            <div className="flex gap-2 mt-3">
              <Link
                href="/cart"
                className="flex-1 py-2 px-3 bg-charcoal text-cream text-xs text-center tracking-wide uppercase hover:bg-olive transition-colors"
              >
                View Cart
              </Link>
              <button
                onClick={() => setShow(false)}
                className="py-2 px-3 border border-sand text-olive text-xs tracking-wide uppercase hover:border-charcoal hover:text-charcoal transition-colors"
              >
                Continue
              </button>
            </div>
          </div>

          <button
            onClick={() => setShow(false)}
            className="p-1 text-olive hover:text-charcoal transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
