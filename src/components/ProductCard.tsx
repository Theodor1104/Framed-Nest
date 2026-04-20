'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Eye } from 'lucide-react';
import { Product, getLowestPrice } from '@/lib/products';
import { useWishlistStore } from '@/store/wishlist';
import QuickView from './QuickView';

interface ProductCardProps {
  product: Product;
  index?: number;
  showCollection?: boolean;
}

export default function ProductCard({ product, index = 0, showCollection = true }: ProductCardProps) {
  const [showQuickView, setShowQuickView] = useState(false);
  const { toggleItem, isInWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(product.id);

  const hasImage = product.image && !product.image.includes('placeholder');

  return (
    <>
      <div
        className="group product-card animate-fade-in-up relative"
        style={{ animationDelay: `${Math.min(index * 50, 400)}ms` }}
      >
        {/* Wishlist button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleItem(product.id);
          }}
          className="absolute top-3 right-3 z-10 p-2.5 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
          title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              inWishlist ? 'fill-red-500 text-red-500' : 'text-charcoal hover:text-red-500'
            }`}
          />
        </button>

        <Link href={`/product/${product.id}`}>
          <div className="aspect-[3/4] bg-sand/30 mb-4 overflow-hidden relative image-zoom">
            {hasImage ? (
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
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowQuickView(true);
                  }}
                  className="absolute left-3 bottom-3 z-10 p-2.5 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
                  title="Quick view"
                >
                  <Eye className="w-4 h-4 text-charcoal" />
                </button>

                {/* View details button */}
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
            {showCollection && (
              <p className="text-xs uppercase tracking-wider text-olive">
                {product.collection}
              </p>
            )}
            <h3 className="text-sm font-medium text-charcoal group-hover:text-olive transition-colors">
              {product.title}
            </h3>
            <p className="text-sm text-charcoal">From {getLowestPrice(product)} kr</p>
          </div>
        </Link>
      </div>

      {/* Quick View Modal */}
      <QuickView
        product={product}
        isOpen={showQuickView}
        onClose={() => setShowQuickView(false)}
      />
    </>
  );
}
