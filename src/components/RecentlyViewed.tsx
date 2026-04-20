'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRecentlyViewedStore } from '@/store/recentlyViewed';
import { getProductById, getLowestPrice, Product } from '@/lib/products';

export default function RecentlyViewed({ excludeProductId }: { excludeProductId?: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const items = useRecentlyViewedStore((state) => state.items);

  useEffect(() => {
    const recentProducts = items
      .filter((id) => id !== excludeProductId)
      .map((id) => getProductById(id))
      .filter((p): p is Product => p !== null)
      .slice(0, 4);

    setProducts(recentProducts);
  }, [items, excludeProductId]);

  if (products.length === 0) return null;

  return (
    <section className="py-16 border-t border-sand/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-light text-charcoal mb-8 text-center">
          Recently Viewed
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, index) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-[3/4] bg-sand/20 mb-3 overflow-hidden relative">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors" />
              </div>
              <h3 className="text-sm font-medium text-charcoal group-hover:text-olive transition-colors truncate">
                {product.title}
              </h3>
              <p className="text-sm text-olive">From {getLowestPrice(product)} kr</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
