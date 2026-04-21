import Link from 'next/link';
import { Instagram, Facebook, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream/80 mt-auto">
      {/* Newsletter Section */}
      <div className="border-b border-cream/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-light text-cream mb-2">
                Bliv en del af Framed Nest
              </h3>
              <p className="text-cream/60 font-light">
                Få eksklusive tilbud, nye kollektioner og inspiration direkte i din indbakke.
              </p>
            </div>
            <form className="flex gap-3">
              <input
                type="email"
                placeholder="Din email"
                className="flex-1 px-4 py-3 bg-cream/10 border border-cream/20 text-cream placeholder:text-cream/40 focus:outline-none focus:border-cream/50 transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-cream text-charcoal text-sm tracking-wider uppercase hover:bg-sand transition-colors whitespace-nowrap"
              >
                Tilmeld
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-xl font-light tracking-wide text-cream mb-4">
              Framed Nest
            </h3>
            <p className="text-sm leading-relaxed text-cream/60 mb-6">
              Kuraterede kunstprint til moderne hjem. Premium plakater der transformerer dit rum.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="https://instagram.com/framednest"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-cream/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com/framednest"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-cream/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="mailto:hello@framednest.dk"
                className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-cream/20 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-sm font-medium tracking-wider uppercase text-cream mb-4">
              Shop
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/shop" className="text-sm text-cream/60 hover:text-cream transition-colors">
                  Alle Prints
                </Link>
              </li>
              <li>
                <Link href="/collections" className="text-sm text-cream/60 hover:text-cream transition-colors">
                  Kollektioner
                </Link>
              </li>
              <li>
                <Link href="/collections/architectural" className="text-sm text-cream/60 hover:text-cream transition-colors">
                  Arkitektur
                </Link>
              </li>
              <li>
                <Link href="/collections/photography" className="text-sm text-cream/60 hover:text-cream transition-colors">
                  Fotografi
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-sm font-medium tracking-wider uppercase text-cream mb-4">
              Information
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-cream/60 hover:text-cream transition-colors">
                  Om Os
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-cream/60 hover:text-cream transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-sm text-cream/60 hover:text-cream transition-colors">
                  Levering
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-sm text-cream/60 hover:text-cream transition-colors">
                  Returnering
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-medium tracking-wider uppercase text-cream mb-4">
              Kontakt
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:hello@framednest.dk" className="text-sm text-cream/60 hover:text-cream transition-colors">
                  hello@framednest.dk
                </a>
              </li>
              <li className="text-sm text-cream/60">
                Svar inden for 24 timer
              </li>
            </ul>
          </div>
        </div>

        {/* Payment & Trust */}
        <div className="border-t border-cream/10 mt-12 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-6">
              <p className="text-xs text-cream/40">Sikker betaling med</p>
              <div className="flex gap-3">
                <div className="px-3 py-1 bg-cream/10 rounded text-xs text-cream/60">Visa</div>
                <div className="px-3 py-1 bg-cream/10 rounded text-xs text-cream/60">Mastercard</div>
                <div className="px-3 py-1 bg-cream/10 rounded text-xs text-cream/60">MobilePay</div>
              </div>
            </div>
            <p className="text-xs text-cream/40">
              &copy; {new Date().getFullYear()} Framed Nest. Alle rettigheder forbeholdes.
            </p>
          </div>
        </div>

        {/* Legal */}
        <div className="flex justify-center gap-6 mt-6">
          <Link href="/privacy" className="text-xs text-cream/40 hover:text-cream/60 transition-colors">
            Privatlivspolitik
          </Link>
          <Link href="/terms" className="text-xs text-cream/40 hover:text-cream/60 transition-colors">
            Handelsbetingelser
          </Link>
          <Link href="/cookies" className="text-xs text-cream/40 hover:text-cream/60 transition-colors">
            Cookies
          </Link>
        </div>
      </div>
    </footer>
  );
}
