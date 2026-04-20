'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ArrowRight, ShoppingBag, Trash2 } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlist';
import { getProductById, getLowestPrice, Product } from '@/lib/products';

export default function WishlistPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const { items, removeItem } = useWishlistStore();

  useEffect(() => {
    const wishlistProducts = items
      .map((id) => getProductById(id))
      .filter((p): p is Product => p !== null);
    setProducts(wishlistProducts);
  }, [items]);

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <p className="text-sm uppercase tracking-[0.2em] text-olive mb-3">
            Your Collection
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-charcoal mb-4">
            Wishlist
          </h1>
          <p className="text-olive">
            {products.length} {products.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16 animate-fade-in-up">
            <Heart className="w-16 h-16 text-sand mx-auto mb-6" />
            <h2 className="text-xl font-light text-charcoal mb-3">
              Your wishlist is empty
            </h2>
            <p className="text-olive mb-8 max-w-md mx-auto">
              Save your favorite prints to revisit them later. Click the heart icon on any product to add it to your wishlist.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-charcoal text-cream text-sm tracking-widest uppercase hover:bg-charcoal/90 transition-colors"
            >
              Explore Prints
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="group animate-fade-in-up relative"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Remove button */}
                <button
                  onClick={() => removeItem(product.id)}
                  className="absolute top-3 right-3 z-10 p-2 bg-white/90 hover:bg-red-50 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4 text-charcoal hover:text-red-500 transition-colors" />
                </button>

                <Link href={`/product/${product.id}`}>
                  <div className="aspect-[3/4] bg-sand/20 mb-4 overflow-hidden relative">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors" />

                    {/* Quick add overlay */}
                    <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <span className="flex items-center justify-center gap-2 w-full py-3 bg-white/95 hover:bg-white text-charcoal text-xs tracking-widest uppercase shadow-lg">
                        <ShoppingBag className="w-3 h-3" />
                        View Details
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-wider text-olive">
                      {product.collection}
                    </p>
                    <h3 className="text-sm font-medium text-charcoal group-hover:text-olive transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-sm text-charcoal">
                      From {getLowestPrice(product)} kr
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Continue shopping */}
        {products.length > 0 && (
          <div className="text-center mt-16">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-sm text-charcoal tracking-widest uppercase border-b border-charcoal pb-1 hover:text-olive hover:border-olive transition-colors"
            >
              Continue Shopping
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
