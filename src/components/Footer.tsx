import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream/80 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-light tracking-wide text-cream mb-4">
              Framed Nest
            </h3>
            <p className="text-sm leading-relaxed max-w-sm">
              Curated art prints for modern living. Premium posters that transform
              your space into a gallery.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-sm font-medium tracking-wide text-cream mb-4">
              Shop
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/shop" className="text-sm hover:text-cream transition-colors">
                  All Prints
                </Link>
              </li>
              <li>
                <Link href="/collections" className="text-sm hover:text-cream transition-colors">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/collections/bestsellers" className="text-sm hover:text-cream transition-colors">
                  Bestsellers
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-medium tracking-wide text-cream mb-4">
              Support
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-sm hover:text-cream transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:text-cream transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm hover:text-cream transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-cream/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-cream/60">
            &copy; {new Date().getFullYear()} Framed Nest. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link href="/privacy" className="text-xs text-cream/60 hover:text-cream transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-cream/60 hover:text-cream transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
