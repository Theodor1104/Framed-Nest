'use client';

import { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ArrowRight } from 'lucide-react';
import { products, collectionsData, getLowestPrice, getCollectionSlug } from '@/lib/products';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function CollectionPage({ params }: PageProps) {
  const { slug } = use(params);
  const collection = collectionsData[slug];

  if (!collection) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-24">
        <h1 className="text-2xl font-light text-charcoal mb-4">
          Collection not found
        </h1>
        <Link
          href="/collections"
          className="text-olive hover:text-charcoal transition-colors"
        >
          View all collections
        </Link>
      </div>
    );
  }

  // Get products for this collection
  const collectionProducts = products.filter(
    (p) => getCollectionSlug(p.collection) === slug
  );

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/collections"
          className="inline-flex items-center text-sm text-olive hover:text-charcoal transition-colors mb-8 animate-fade-in"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          All collections
        </Link>

        {/* Collection header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <p className="text-sm uppercase tracking-[0.2em] text-olive mb-3">Collection</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-charcoal mb-4">
            {collection.name}
          </h1>
          <p className="text-olive max-w-2xl mx-auto leading-relaxed">
            {collection.description}
          </p>
          <p className="text-sm text-charcoal mt-4">
            {collectionProducts.length} {collectionProducts.length === 1 ? 'print' : 'prints'}
          </p>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {collectionProducts.map((product, index) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group product-card animate-fade-in-up"
              style={{ animationDelay: `${Math.min(index * 50, 400)}ms` }}
            >
              <div className="aspect-[3/4] bg-sand/30 mb-4 overflow-hidden relative image-zoom">
                {product.image && !product.image.includes('placeholder') ? (
                  <>
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-300" />
                    {/* Quick view button */}
                    <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <span className="block w-full py-3 bg-white/95 hover:bg-white text-charcoal text-xs tracking-widest uppercase text-center shadow-lg">
                        View Details
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-olive/30">
                    <span className="text-xs">Coming Soon</span>
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-charcoal group-hover:text-olive transition-colors">
                  {product.title}
                </h3>
                <p className="text-sm text-olive">From {getLowestPrice(product)} kr</p>
              </div>
            </Link>
          ))}
        </div>

        {collectionProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-olive mb-4">No prints found in this collection.</p>
            <Link
              href="/shop"
              className="inline-flex items-center text-sm text-charcoal hover:text-olive transition-colors"
            >
              Browse all prints
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        )}

        {/* View all CTA */}
        {collectionProducts.length > 0 && (
          <div className="text-center mt-16">
            <Link
              href="/shop"
              className="group inline-flex items-center text-sm text-charcoal tracking-widest uppercase border-b border-charcoal pb-1 hover:text-olive hover:border-olive transition-colors"
            >
              View all prints
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
