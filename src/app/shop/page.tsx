'use client';

import { useState } from 'react';
import { ArrowUpDown, Grid2X2, Grid3X3, LayoutGrid } from 'lucide-react';
import { products, collections, getLowestPrice } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

type SortOption = 'newest' | 'price-low' | 'price-high' | 'name';
type GridSize = 2 | 3 | 4;

export default function ShopPage() {
  const [activeCollection, setActiveCollection] = useState('All');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [gridSize, setGridSize] = useState<GridSize>(4);

  const filteredProducts = products
    .filter((p) => activeCollection === 'All' || p.collection === activeCollection)
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return getLowestPrice(a) - getLowestPrice(b);
        case 'price-high':
          return getLowestPrice(b) - getLowestPrice(a);
        case 'name':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  const gridClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-2 sm:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
  };

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <p className="text-sm uppercase tracking-[0.2em] text-olive mb-3">Our Collection</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-charcoal mb-4">
            Shop All Prints
          </h1>
          <p className="text-olive max-w-xl mx-auto">
            Discover our curated collection of premium art prints, designed for modern, sophisticated spaces.
          </p>
        </div>

        {/* Filters & Sort */}
        <div className="flex flex-col gap-6 mb-8">
          {/* Collection Filters */}
          <div className="flex flex-wrap justify-center gap-2 animate-fade-in-up">
            {collections.map((collection) => (
              <button
                key={collection}
                onClick={() => setActiveCollection(collection)}
                className={`px-5 py-2.5 text-sm tracking-wide transition-all ${
                  collection === activeCollection
                    ? 'bg-charcoal text-cream'
                    : 'bg-transparent text-olive hover:text-charcoal border border-sand hover:border-charcoal'
                }`}
              >
                {collection}
              </button>
            ))}
          </div>

          {/* Sort & Grid Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-sand/30">
            {/* Results count */}
            <p className="text-sm text-olive">
              Showing <span className="text-charcoal font-medium">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'print' : 'prints'}
              {activeCollection !== 'All' && <span> in <span className="text-charcoal">{activeCollection}</span></span>}
            </p>

            <div className="flex items-center gap-4">
              {/* Grid size toggle */}
              <div className="hidden md:flex items-center gap-1 border border-sand rounded-sm p-1">
                <button
                  onClick={() => setGridSize(2)}
                  className={`p-1.5 rounded-sm transition-colors ${gridSize === 2 ? 'bg-charcoal text-cream' : 'text-olive hover:text-charcoal'}`}
                  aria-label="2 columns"
                >
                  <Grid2X2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setGridSize(3)}
                  className={`p-1.5 rounded-sm transition-colors ${gridSize === 3 ? 'bg-charcoal text-cream' : 'text-olive hover:text-charcoal'}`}
                  aria-label="3 columns"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setGridSize(4)}
                  className={`p-1.5 rounded-sm transition-colors ${gridSize === 4 ? 'bg-charcoal text-cream' : 'text-olive hover:text-charcoal'}`}
                  aria-label="4 columns"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-olive" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="border border-sand bg-transparent text-sm text-charcoal px-3 py-2 focus:outline-none focus:border-charcoal cursor-pointer"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className={`grid ${gridClasses[gridSize]} gap-4 sm:gap-6 lg:gap-8`}>
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              showCollection={true}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-olive mb-4">No prints found in this collection.</p>
            <button
              onClick={() => setActiveCollection('All')}
              className="text-sm text-charcoal underline hover:text-olive transition-colors"
            >
              View all prints
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
