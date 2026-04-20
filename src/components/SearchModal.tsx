'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X } from 'lucide-react';
import { products, Product } from '@/lib/products';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.length >= 2) {
      const searchTerms = query.toLowerCase().split(' ');
      const filtered = products.filter((product) => {
        const searchText = `${product.title} ${product.description} ${product.collection}`.toLowerCase();
        return searchTerms.every(term => searchText.includes(term));
      });
      setResults(filtered.slice(0, 6));
    } else {
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLinkClick = () => {
    setQuery('');
    onClose();
  };

  const popularSearches = ['Architectural', 'Line Art', 'Abstract', 'Photography'];

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 sm:pt-32">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl mx-4 bg-cream rounded-sm shadow-2xl overflow-hidden animate-fade-in">
        {/* Search input */}
        <div className="flex items-center border-b border-sand/50">
          <Search className="w-5 h-5 text-olive ml-5" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for prints, collections..."
            className="flex-1 px-4 py-5 bg-transparent text-charcoal placeholder:text-olive/50 focus:outline-none text-lg"
          />
          <button
            onClick={onClose}
            className="p-4 text-olive hover:text-charcoal transition-colors"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {query.length >= 2 ? (
            results.length > 0 ? (
              <div className="p-4">
                <p className="text-xs text-olive uppercase tracking-wider mb-3">
                  {results.length} result{results.length !== 1 ? 's' : ''}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.id}`}
                      onClick={handleLinkClick}
                      className="group"
                    >
                      <div className="aspect-[3/4] bg-sand/30 mb-2 overflow-hidden relative">
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="200px"
                        />
                      </div>
                      <h4 className="text-sm font-medium text-charcoal group-hover:text-olive transition-colors truncate">
                        {product.title}
                      </h4>
                      <p className="text-xs text-olive">{product.collection}</p>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-olive">No results found for &quot;{query}&quot;</p>
                <p className="text-sm text-olive/70 mt-2">Try a different search term</p>
              </div>
            )
          ) : (
            <div className="p-6">
              <p className="text-xs text-olive uppercase tracking-wider mb-4">Popular Searches</p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-4 py-2 bg-sand/30 text-sm text-olive hover:bg-sand/50 hover:text-charcoal transition-colors rounded-sm"
                  >
                    {term}
                  </button>
                ))}
              </div>

              <div className="mt-8">
                <p className="text-xs text-olive uppercase tracking-wider mb-4">Quick Links</p>
                <div className="space-y-2">
                  <Link
                    href="/shop"
                    onClick={handleLinkClick}
                    className="block text-charcoal hover:text-olive transition-colors"
                  >
                    View All Prints
                  </Link>
                  <Link
                    href="/collections"
                    onClick={handleLinkClick}
                    className="block text-charcoal hover:text-olive transition-colors"
                  >
                    Browse Collections
                  </Link>
                  <Link
                    href="/collections/architectural"
                    onClick={handleLinkClick}
                    className="block text-charcoal hover:text-olive transition-colors"
                  >
                    Architectural Collection
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div className="px-4 py-3 bg-sand/20 border-t border-sand/30">
          <p className="text-xs text-olive text-center">
            Press <kbd className="px-1.5 py-0.5 bg-sand/50 rounded text-charcoal">ESC</kbd> to close
          </p>
        </div>
      </div>
    </div>
  );
}
