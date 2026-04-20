'use client';

import Link from 'next/link';
import Image from 'next/image';
import { products, getLowestPrice, Product } from '@/lib/products';

interface RelatedProductsProps {
  currentProductId: string;
  collection: string;
}

export default function RelatedProducts({ currentProductId, collection }: RelatedProductsProps) {
  // Get products from the same collection, excluding current product
  const sameCollection = products.filter(
    (p) => p.collection === collection && p.id !== currentProductId
  );

  // Get products from other collections for variety
  const otherProducts = products.filter(
    (p) => p.collection !== collection && p.id !== currentProductId
  );

  // Combine: prioritize same collection, fill with others
  const relatedProducts: Product[] = [
    ...sameCollection.slice(0, 3),
    ...otherProducts.slice(0, Math.max(0, 4 - sameCollection.length)),
  ].slice(0, 4);

  if (relatedProducts.length === 0) return null;

  return (
    <section className="py-16 sm:py-24 border-t border-sand/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.2em] text-olive mb-3">You May Also Like</p>
          <h2 className="text-2xl sm:text-3xl font-light text-charcoal">
            Related Prints
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {relatedProducts.map((product, index) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-[3/4] bg-sand/30 mb-4 overflow-hidden relative">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-300" />
              </div>
              <div className="text-center">
                <p className="text-xs uppercase tracking-wider text-olive mb-1">{product.collection}</p>
                <h3 className="text-sm font-medium text-charcoal group-hover:text-olive transition-colors">
                  {product.title}
                </h3>
                <p className="text-sm text-olive mt-1">
                  From {getLowestPrice(product)} kr
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
