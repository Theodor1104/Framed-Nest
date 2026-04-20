'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Heart, ShoppingBag, Plus, Minus, ArrowRight } from 'lucide-react';
import { Product } from '@/lib/products';
import { useCartStore } from '@/store/cart';
import { useWishlistStore } from '@/store/wishlist';

interface QuickViewProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickView({ product, isOpen, onClose }: QuickViewProps) {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(product.id);

  if (!isOpen) return null;

  const variant = product.variants[selectedVariant];
  const price = variant.price;

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      title: product.title,
      image: product.image,
      variant: variant.size,
      frame: 'none',
      price: price,
      quantity: quantity,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-sm shadow-2xl animate-scale-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all"
        >
          <X className="w-5 h-5 text-charcoal" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-[3/4] bg-sand/20">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
              sizes="50vw"
            />

            {/* Wishlist button */}
            <button
              onClick={() => toggleItem(product.id)}
              className="absolute top-4 left-4 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  inWishlist ? 'fill-red-500 text-red-500' : 'text-charcoal'
                }`}
              />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 flex flex-col">
            <div className="flex-1">
              <p className="text-sm text-olive uppercase tracking-wider mb-2">
                {product.collection}
              </p>
              <h2 className="text-2xl font-light text-charcoal mb-2">
                {product.title}
              </h2>
              <p className="text-xl text-charcoal mb-6">{price} kr</p>

              {product.description && (
                <p className="text-olive text-sm leading-relaxed mb-6">
                  {product.description}
                </p>
              )}

              {/* Size selector */}
              <div className="mb-6">
                <p className="text-sm font-medium text-charcoal mb-3">Size</p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v, index) => (
                    <button
                      key={v.size}
                      onClick={() => setSelectedVariant(index)}
                      className={`px-4 py-2 text-sm border transition-all ${
                        selectedVariant === index
                          ? 'border-charcoal bg-charcoal text-white'
                          : 'border-sand text-olive hover:border-charcoal'
                      }`}
                    >
                      {v.size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <p className="text-sm font-medium text-charcoal mb-3">Quantity</p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 border border-sand hover:border-charcoal transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-lg w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 border border-sand hover:border-charcoal transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={addedToCart}
                className={`w-full py-4 text-sm tracking-widest uppercase flex items-center justify-center gap-2 transition-all ${
                  addedToCart
                    ? 'bg-green-600 text-white'
                    : 'bg-charcoal text-cream hover:bg-charcoal/90'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
              </button>

              <Link
                href={`/product/${product.id}`}
                onClick={onClose}
                className="w-full py-4 border border-charcoal text-charcoal text-sm tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-charcoal hover:text-cream transition-all"
              >
                View Full Details
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
