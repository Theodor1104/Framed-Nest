import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Truck, Shield, Award } from 'lucide-react';
import { products, getLowestPrice } from '@/lib/products';

// Get 4 featured products (one from each main collection)
const featuredProducts = [
  products.find((p) => p.id === '1')!, // Santorini Steps - Architectural
  products.find((p) => p.id === '2')!, // Abstract Form I - Neutral Abstract
  products.find((p) => p.id === '7')!, // Female Profile - Fine Art Lines
  products.find((p) => p.id === '4')!, // Desert Dunes - Photography
];

const collectionsInfo = [
  { name: 'Architectural', slug: 'architectural', count: 8, image: '/images/santorini-steps.jpg' },
  { name: 'Fine Art Lines', slug: 'fine-art-lines', count: 6, image: '/images/female-profile.jpg' },
  { name: 'Neutral Abstract', slug: 'neutral-abstract', count: 8, image: '/images/abstract-form.jpg' },
  { name: 'Photography', slug: 'photography', count: 8, image: '/images/desert-dunes.jpg' },
];

export default function Home() {
  return (
    <div>
      {/* Hero Section - Full width with centered content */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/grecian-arches.jpg"
            alt="Framed Nest - Premium Art Prints"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-cream/70" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <p className="text-sm uppercase tracking-[0.3em] text-olive mb-6">
            Premium Art Prints
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tight text-charcoal mb-8">
            Art that feels
            <br />
            <span className="italic">like home</span>
          </h1>
          <p className="text-lg sm:text-xl text-olive mb-10 font-light max-w-xl mx-auto">
            Curated prints for those who believe their walls deserve more than ordinary
          </p>
          <Link
            href="/shop"
            className="group inline-flex items-center px-10 py-4 bg-charcoal text-cream text-sm tracking-widest uppercase hover:bg-olive transition-all duration-300"
          >
            Shop Now
            <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-charcoal/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-charcoal/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-8 bg-charcoal text-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="flex items-center justify-center gap-3">
              <Truck className="w-5 h-5 text-sand" />
              <span className="text-sm tracking-wide">Free shipping over 499 kr</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Award className="w-5 h-5 text-sand" />
              <span className="text-sm tracking-wide">Museum-grade quality</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Shield className="w-5 h-5 text-sand" />
              <span className="text-sm tracking-wide">Secure checkout</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products - Premium Grid */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-olive mb-4">Bestsellers</p>
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-charcoal">
            Most Loved Prints
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group"
            >
              <div className="aspect-[3/4] bg-sand/20 mb-6 overflow-hidden relative">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-300" />
                {/* Quick view button */}
                <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="block w-full py-3 bg-white/95 text-charcoal text-xs tracking-widest uppercase text-center">
                    Quick View
                  </span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-xs uppercase tracking-wider text-olive mb-2">{product.collection}</p>
                <h3 className="text-base font-light text-charcoal mb-2">
                  {product.title}
                </h3>
                <p className="text-sm text-charcoal">
                  From {getLowestPrice(product)} kr
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            href="/shop"
            className="group inline-flex items-center text-sm text-charcoal tracking-widest uppercase border-b border-charcoal pb-1 hover:text-olive hover:border-olive transition-colors"
          >
            View all prints
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Staircase Section 1: Our Philosophy + Sustainability */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-sand/10 overflow-hidden">
        <div className="max-w-6xl mx-auto space-y-20 md:space-y-32">
          {/* Top: Image left, Text right */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="aspect-[4/5] relative overflow-hidden">
              <Image
                src="/images/spiral-staircase.jpg"
                alt="Framed Nest"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-olive mb-4">Our Philosophy</p>
              <h2 className="text-3xl sm:text-4xl font-light text-charcoal mb-6 tracking-tight">
                Your walls deserve intention
              </h2>
              <div className="space-y-4 text-olive leading-relaxed">
                <p>
                  At Framed Nest, we believe that the art on your walls should be as thoughtfully
                  chosen as every other element of your home. Not random posters. Not mass-produced
                  prints. But carefully curated pieces that elevate your space.
                </p>
                <p>
                  Each piece in our collection is selected with one question: would this belong
                  in a beautifully designed home? If it would not feel at home in a Copenhagen
                  apartment or a minimalist villa, it does not belong here.
                </p>
              </div>
              <Link
                href="/about"
                className="inline-flex items-center mt-8 text-sm text-charcoal tracking-widest uppercase border-b border-charcoal pb-1 hover:text-olive hover:border-olive transition-colors"
              >
                Learn more about us
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Bottom: Image left, Text right - offset to the right */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center md:translate-x-20 lg:translate-x-32">
            <div className="aspect-[4/5] relative overflow-hidden">
              <Image
                src="/images/desert-dunes.jpg"
                alt="Sustainable practices"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-olive mb-4">Sustainability</p>
              <h2 className="text-3xl sm:text-4xl font-light text-charcoal mb-6 tracking-tight">
                Mindful by design
              </h2>
              <div className="space-y-4 text-olive leading-relaxed">
                <p>
                  We print on demand, which means zero waste from unsold inventory. Your print
                  is created specifically for you, reducing our environmental footprint while
                  ensuring freshness.
                </p>
                <p>
                  Our paper is FSC-certified, our packaging is recyclable, and we partner with
                  carbon-neutral shipping providers. Beautiful art shouldn&apos;t cost the earth.
                </p>
              </div>
              <Link
                href="/about"
                className="inline-flex items-center mt-8 text-sm text-charcoal tracking-widest uppercase border-b border-charcoal pb-1 hover:text-olive hover:border-olive transition-colors"
              >
                Our sustainability efforts
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Grid - Premium */}
      <section className="py-24 sm:py-32">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.2em] text-olive mb-4">Curated Collections</p>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-charcoal">
              Shop by Style
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {collectionsInfo.map((collection) => (
              <Link
                key={collection.slug}
                href={`/collections/${collection.slug}`}
                className="group relative"
              >
                <div className="aspect-[4/5] overflow-hidden relative">
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-charcoal/10 group-hover:from-charcoal/90 transition-all duration-300" />
                  <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-center">
                    <h3 className="text-lg sm:text-xl font-light text-cream mb-1">
                      {collection.name}
                    </h3>
                    <p className="text-xs text-cream/70 uppercase tracking-wider mb-3">
                      {collection.count} prints
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs text-cream bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      Se kollektion
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Staircase Section 1: Quality + Framing */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-sand/10 overflow-hidden">
        <div className="max-w-6xl mx-auto space-y-20 md:space-y-32">
          {/* Top: Image left, Text right */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="aspect-[4/5] relative overflow-hidden">
              <Image
                src="/images/misty-mountains.jpg"
                alt="Premium quality prints"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-olive mb-4">The Details Matter</p>
              <h2 className="text-3xl sm:text-4xl font-light text-charcoal mb-6 tracking-tight">
                Premium prints that transform spaces
              </h2>
              <div className="space-y-4 text-olive leading-relaxed">
                <p>
                  Every print is produced on 200gsm museum-grade matte paper using archival
                  pigment inks that last a lifetime. The result? Rich, vibrant colors that
                  won&apos;t fade for generations.
                </p>
                <p>
                  We partner with certified print houses that share our obsession with perfection.
                  Each piece undergoes quality inspection before it leaves, ensuring you receive
                  nothing less than flawless.
                </p>
              </div>
              <Link
                href="/about"
                className="inline-flex items-center mt-8 text-sm text-charcoal tracking-widest uppercase border-b border-charcoal pb-1 hover:text-olive hover:border-olive transition-colors"
              >
                Our quality promise
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Bottom: Image left, Text right - offset to the right */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center md:translate-x-20 lg:translate-x-32">
            <div className="aspect-[4/5] relative overflow-hidden">
              <Image
                src="/images/mediterranean-door.jpg"
                alt="Premium framing options"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-olive mb-4">The Finishing Touch</p>
              <h2 className="text-3xl sm:text-4xl font-light text-charcoal mb-6 tracking-tight">
                Ready to hang, designed to last
              </h2>
              <div className="space-y-4 text-olive leading-relaxed">
                <p>
                  Choose from our selection of handcrafted frames in solid oak, sleek black,
                  or clean white. Each frame is fitted with shatter-resistant acrylic glass
                  and arrives ready to hang.
                </p>
                <p>
                  Prefer to frame it yourself? Our unframed prints arrive in protective
                  packaging, flat and pristine, ready for your personal touch.
                </p>
              </div>
              <Link
                href="/shop"
                className="inline-flex items-center mt-8 text-sm text-charcoal tracking-widest uppercase border-b border-charcoal pb-1 hover:text-olive hover:border-olive transition-colors"
              >
                Explore framing options
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter - Premium */}
      <section className="py-20 bg-charcoal">
        <div className="max-w-xl mx-auto px-4 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-sand mb-4">Join the Nest</p>
          <h2 className="text-2xl sm:text-3xl font-light text-cream mb-4">
            Be the first to know
          </h2>
          <p className="text-cream/70 mb-8 font-light">
            New releases, exclusive offers, and interior inspiration delivered to your inbox
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-6 py-4 bg-transparent border border-cream/30 text-cream placeholder:text-cream/50 focus:outline-none focus:border-cream transition-colors"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-cream text-charcoal text-sm tracking-widest uppercase hover:bg-sand transition-colors"
            >
              Subscribe
            </button>
          </form>
          <p className="text-xs text-cream/50 mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </div>
  );
}
