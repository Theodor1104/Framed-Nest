'use client';

import { useState, use, useEffect } from 'react';
import Link from 'next/link';
import { Minus, Plus, Check, ShoppingBag, Heart, Maximize2 } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { useWishlistStore } from '@/store/wishlist';
import { useRecentlyViewedStore } from '@/store/recentlyViewed';
import { getProductById } from '@/lib/products';
import FramePreview, { FrameStyle } from '@/components/FramePreview';
import RoomShowroom from '@/components/RoomShowroom';
import RelatedProducts from '@/components/RelatedProducts';
import RecentlyViewed from '@/components/RecentlyViewed';

interface PageProps {
  params: Promise<{ id: string }>;
}

const frameOptions: { style: FrameStyle; name: string; price: number; color: string }[] = [
  { style: 'none', name: 'No Frame', price: 0, color: 'transparent' },
  { style: 'black', name: 'Black', price: 149, color: '#1a1a1a' },
  { style: 'white', name: 'White', price: 149, color: '#f5f5f5' },
  { style: 'oak', name: 'Oak', price: 179, color: '#8B5A2B' },
];

export default function ProductPage({ params }: PageProps) {
  const { id: productId } = use(params);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedFrame, setSelectedFrame] = useState<FrameStyle>('none');
  const [quantity, setQuantity] = useState(1);
  const [showShowroom, setShowShowroom] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();
  const addToRecentlyViewed = useRecentlyViewedStore((state) => state.addItem);

  const product = getProductById(productId);
  const inWishlist = product ? isInWishlist(product.id) : false;

  // Track recently viewed
  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product.id);
    }
  }, [product, addToRecentlyViewed]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-24">
        <h1 className="text-2xl font-light text-charcoal mb-4">
          Product not found
        </h1>
        <Link
          href="/shop"
          className="text-olive hover:text-charcoal transition-colors"
        >
          Back to shop
        </Link>
      </div>
    );
  }

  const variant = product.variants[selectedVariant];
  const frameOption = frameOptions.find((f) => f.style === selectedFrame)!;
  const currentPrice = variant.price + frameOption.price;

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${variant.id}-${selectedFrame}`,
      productId: product.id,
      title: product.title,
      image: product.image,
      size: variant.title,
      framed: selectedFrame !== 'none',
      price: currentPrice,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <>
      <div className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-olive mb-8 animate-fade-in">
            <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-charcoal transition-colors">Shop</Link>
            <span>/</span>
            <Link href={`/collections/${product.collection.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-charcoal transition-colors">
              {product.collection}
            </Link>
            <span>/</span>
            <span className="text-charcoal">{product.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Image with frame preview */}
            <div className="space-y-4 animate-fade-in-up">
              <div className="aspect-[3/4] bg-sand/30 relative overflow-hidden group">
                {!product.image.includes('placeholder') ? (
                  <>
                    <FramePreview
                      imageSrc={product.image}
                      alt={product.title}
                      frameStyle={selectedFrame}
                      className="w-full h-full"
                    />
                    {/* View in Room button */}
                    <button
                      onClick={() => setShowShowroom(true)}
                      className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2.5 bg-white/95 hover:bg-white text-charcoal text-sm tracking-wide rounded-sm shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105"
                    >
                      <Maximize2 className="w-4 h-4" />
                      Se i rum
                    </button>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-olive/30">
                    <span className="text-lg">Coming Soon</span>
                  </div>
                )}
              </div>

              {/* Size guide hint + View in room button for mobile */}
              <div className="flex items-center justify-between">
                <p className="text-xs text-olive">
                  {variant.title}
                </p>
                <button
                  onClick={() => setShowShowroom(true)}
                  className="flex items-center gap-1.5 text-xs text-charcoal hover:text-olive transition-colors"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  Se i rum
                </button>
              </div>
            </div>

            {/* Details */}
            <div className="flex flex-col animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <div className="mb-6">
                <p className="text-sm text-olive tracking-wide uppercase mb-2">{product.collection}</p>
                <h1 className="text-3xl sm:text-4xl font-light text-charcoal mb-4 tracking-tight">
                  {product.title}
                </h1>
                <p className="text-olive leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Divider */}
              <div className="border-t border-sand/50 my-6" />

              {/* Size selection */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-charcoal uppercase tracking-wide">Size</h3>
                  <button className="text-xs text-olive hover:text-charcoal underline transition-colors">Size Guide</button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {product.variants.map((v, index) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(index)}
                      className={`py-3 text-sm border transition-all ${
                        selectedVariant === index
                          ? 'border-charcoal bg-charcoal text-cream'
                          : 'border-sand text-olive hover:border-charcoal'
                      }`}
                    >
                      {v.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Frame selection - Visual */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-charcoal uppercase tracking-wide">Frame</h3>
                  <span className="text-sm text-olive">
                    {frameOption.name} {frameOption.price > 0 && `(+${frameOption.price} kr)`}
                  </span>
                </div>
                <div className="flex gap-3">
                  {frameOptions.map((frame) => (
                    <button
                      key={frame.style}
                      onClick={() => setSelectedFrame(frame.style)}
                      className={`relative w-14 h-14 rounded-sm transition-all ${
                        selectedFrame === frame.style
                          ? 'ring-2 ring-charcoal ring-offset-2'
                          : 'ring-1 ring-sand hover:ring-charcoal'
                      }`}
                      title={`${frame.name}${frame.price > 0 ? ` (+${frame.price} kr)` : ''}`}
                    >
                      {frame.style === 'none' ? (
                        <div className="w-full h-full flex items-center justify-center bg-sand/20">
                          <span className="text-[10px] text-olive">NONE</span>
                        </div>
                      ) : (
                        <div
                          className="w-full h-full"
                          style={{ backgroundColor: frame.color }}
                        />
                      )}
                      {selectedFrame === frame.style && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-charcoal rounded-full flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 text-cream" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-olive mt-3">
                  Premium {frameOption.style !== 'none' ? `${frameOption.name.toLowerCase()} wood frame with museum-quality glass` : 'print on archival matte paper'}
                </p>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-charcoal uppercase tracking-wide mb-4">Quantity</h3>
                <div className="flex items-center border border-sand w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-olive hover:text-charcoal hover:bg-sand/20 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-6 text-charcoal font-medium min-w-[60px] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 text-olive hover:text-charcoal hover:bg-sand/20 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Price and add to cart */}
              <div className="mt-auto space-y-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-light text-charcoal">
                    {currentPrice * quantity} kr
                  </span>
                  {quantity > 1 && (
                    <span className="text-sm text-olive">
                      {currentPrice} kr each
                    </span>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={addedToCart}
                    className={`flex-1 py-4 text-sm tracking-widest uppercase transition-all flex items-center justify-center gap-2 ${
                      addedToCart
                        ? 'bg-green-600 text-white'
                        : 'bg-charcoal text-cream hover:bg-olive'
                    }`}
                  >
                    {addedToCart ? (
                      <>
                        <Check className="w-4 h-4" />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        Add to Cart
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => toggleItem(product.id)}
                    className={`px-5 py-4 border transition-all flex items-center justify-center ${
                      inWishlist
                        ? 'border-red-500 bg-red-50 text-red-500'
                        : 'border-charcoal text-charcoal hover:bg-charcoal hover:text-cream'
                    }`}
                    title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Trust badges */}
              <div className="mt-8 pt-8 border-t border-sand/50">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-xs font-medium text-charcoal uppercase tracking-wide mb-1">Free Shipping</p>
                    <p className="text-xs text-olive">Orders over 499 kr</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-charcoal uppercase tracking-wide mb-1">Fast Delivery</p>
                    <p className="text-xs text-olive">5-7 business days</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-charcoal uppercase tracking-wide mb-1">Premium Quality</p>
                    <p className="text-xs text-olive">Museum-grade paper</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts
        currentProductId={product.id}
        collection={product.collection}
      />

      {/* Recently Viewed */}
      <RecentlyViewed excludeProductId={product.id} />

      {/* Room Showroom Modal */}
      <RoomShowroom
        imageSrc={product.image}
        productTitle={product.title}
        isOpen={showShowroom}
        onClose={() => setShowShowroom(false)}
        frameStyle={selectedFrame as 'none' | 'black' | 'white' | 'oak'}
      />
    </>
  );
}
