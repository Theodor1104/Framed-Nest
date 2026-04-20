'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, Menu, X, Heart } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { useWishlistStore } from '@/store/wishlist';
import SearchModal from './SearchModal';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistItems = useWishlistStore((state) => state.items);
  const wishlistCount = wishlistItems.length;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-cream/98 backdrop-blur-md shadow-sm'
            : 'bg-cream/95 backdrop-blur-sm'
        } border-b border-sand/30`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 -ml-2 text-olive hover:text-charcoal transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <span className="text-xl sm:text-2xl font-light tracking-wide text-charcoal group-hover:text-olive transition-colors duration-300">
                Framed Nest
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/shop"
                className="text-sm tracking-wide text-olive hover:text-charcoal transition-colors relative group"
              >
                Shop
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-charcoal transition-all duration-300 group-hover:w-full" />
              </Link>
              <Link
                href="/collections"
                className="text-sm tracking-wide text-olive hover:text-charcoal transition-colors relative group"
              >
                Collections
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-charcoal transition-all duration-300 group-hover:w-full" />
              </Link>
              <Link
                href="/about"
                className="text-sm tracking-wide text-olive hover:text-charcoal transition-colors relative group"
              >
                About
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-charcoal transition-all duration-300 group-hover:w-full" />
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-olive hover:text-charcoal transition-colors group relative"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
                <span className="hidden lg:flex absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-olive/60 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  <kbd className="px-1 bg-sand/50 rounded">Cmd</kbd>
                  <span className="mx-0.5">+</span>
                  <kbd className="px-1 bg-sand/50 rounded">K</kbd>
                </span>
              </button>
              <Link
                href="/wishlist"
                className="p-2 text-olive hover:text-charcoal transition-colors relative group"
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 group-hover:scale-110 transition-transform ${wishlistCount > 0 ? 'fill-red-500/20' : ''}`} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium animate-scale-in">
                    {wishlistCount > 9 ? '9+' : wishlistCount}
                  </span>
                )}
              </Link>
              <Link
                href="/cart"
                className="p-2 text-olive hover:text-charcoal transition-colors relative group"
                aria-label="Shopping cart"
              >
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-charcoal text-cream text-xs rounded-full flex items-center justify-center font-medium animate-scale-in">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden border-t border-sand/30 bg-cream overflow-hidden transition-all duration-300 ${
            mobileMenuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="px-4 py-4 space-y-4">
            <Link
              href="/shop"
              className="block text-lg text-charcoal hover:text-olive transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              href="/collections"
              className="block text-lg text-charcoal hover:text-olive transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Collections
            </Link>
            <Link
              href="/about"
              className="block text-lg text-charcoal hover:text-olive transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setSearchOpen(true);
              }}
              className="flex items-center gap-2 text-lg text-charcoal hover:text-olive transition-colors"
            >
              <Search className="w-5 h-5" />
              Search
            </button>
          </nav>
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
