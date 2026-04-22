import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Leaf, Award, Heart, Package, Palette, Home, Check } from 'lucide-react';

export default function AboutPage() {
  return (
    <div>
      {/* Hero - Full width image */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/grecian-arches.jpg"
            alt="Framed Nest"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-charcoal/50" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <p className="text-sm uppercase tracking-[0.3em] text-cream/80 mb-6">
            Our Story
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-cream mb-6">
            Art that feels
            <br />
            <span className="italic">like home</span>
          </h1>
          <p className="text-lg sm:text-xl text-cream/80 font-light max-w-2xl mx-auto">
            We create curated art prints for those who believe their walls deserve more than ordinary.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-olive mb-4">
                How It Started
              </p>
              <h2 className="text-3xl sm:text-4xl font-light text-charcoal mb-6 tracking-tight">
                From frustration to passion
              </h2>
              <div className="space-y-4 text-olive leading-relaxed">
                <p>
                  Framed Nest started in 2023 with a simple frustration: why is it
                  so hard to find quality art for your home that does not cost a fortune
                  or look like everything else out there?
                </p>
                <p>
                  We were tired of mass-produced posters without soul and gallery prices
                  that broke the budget. So we decided to create a third option —
                  curated art prints in museum quality at prices that make sense.
                </p>
                <p>
                  Today we work with talented artists and photographers from around the world
                  to bring unique, timeless pieces into homes everywhere.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] relative overflow-hidden">
                <Image
                  src="/images/spiral-staircase.jpg"
                  alt="Art curation"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="aspect-[3/4] relative overflow-hidden mt-8">
                <Image
                  src="/images/santorini-steps.jpg"
                  alt="Quality prints"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Mosaic */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            <div className="col-span-2 row-span-2 aspect-square relative overflow-hidden">
              <Image
                src="/images/misty-mountains.jpg"
                alt="Misty mountains print"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="aspect-square relative overflow-hidden">
              <Image
                src="/images/abstract-form.jpg"
                alt="Abstract form"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="aspect-square relative overflow-hidden">
              <Image
                src="/images/dancing-figure.jpg"
                alt="Dancing figure"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="aspect-square relative overflow-hidden">
              <Image
                src="/images/desert-dunes.jpg"
                alt="Desert dunes"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="aspect-square relative overflow-hidden">
              <Image
                src="/images/roman-columns.jpg"
                alt="Roman columns"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 sm:py-32 bg-sand/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.2em] text-olive mb-4">
              What We Stand For
            </p>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-charcoal">
              Our Values
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="bg-white p-8 sm:p-10">
              <div className="w-14 h-14 mb-6 rounded-full bg-sand/30 flex items-center justify-center">
                <Award className="w-7 h-7 text-charcoal" />
              </div>
              <h3 className="text-xl font-light text-charcoal mb-3">Uncompromising Quality</h3>
              <p className="text-olive font-light leading-relaxed">
                200gsm museum-quality matte paper. Archival pigment inks that last over 100 years.
                Handcrafted frames in solid wood. We never compromise.
              </p>
            </div>
            <div className="bg-white p-8 sm:p-10">
              <div className="w-14 h-14 mb-6 rounded-full bg-sand/30 flex items-center justify-center">
                <Heart className="w-7 h-7 text-charcoal" />
              </div>
              <h3 className="text-xl font-light text-charcoal mb-3">Carefully Curated</h3>
              <p className="text-olive font-light leading-relaxed">
                Every single print in our collection is hand-selected. We always ask:
                would this belong in a beautifully designed home?
              </p>
            </div>
            <div className="bg-white p-8 sm:p-10">
              <div className="w-14 h-14 mb-6 rounded-full bg-sand/30 flex items-center justify-center">
                <Leaf className="w-7 h-7 text-charcoal" />
              </div>
              <h3 className="text-xl font-light text-charcoal mb-3">Sustainable Production</h3>
              <p className="text-olive font-light leading-relaxed">
                Print-on-demand means zero waste from unsold items. FSC-certified paper,
                recyclable packaging and carbon-neutral delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Process */}
      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.2em] text-olive mb-4">
              From Us To You
            </p>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-charcoal">
              How It Works
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-charcoal text-cream flex items-center justify-center text-2xl font-light">
                1
              </div>
              <div className="mb-4">
                <Palette className="w-8 h-8 mx-auto text-olive" />
              </div>
              <h3 className="text-lg font-light text-charcoal mb-2">Choose Your Print</h3>
              <p className="text-sm text-olive font-light">
                Explore our curated collection and find the perfect artwork for your space.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-charcoal text-cream flex items-center justify-center text-2xl font-light">
                2
              </div>
              <div className="mb-4">
                <Home className="w-8 h-8 mx-auto text-olive" />
              </div>
              <h3 className="text-lg font-light text-charcoal mb-2">Customize Size</h3>
              <p className="text-sm text-olive font-light">
                Choose from four sizes and optionally add a premium frame in oak, black or white.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-charcoal text-cream flex items-center justify-center text-2xl font-light">
                3
              </div>
              <div className="mb-4">
                <Package className="w-8 h-8 mx-auto text-olive" />
              </div>
              <h3 className="text-lg font-light text-charcoal mb-2">We Produce</h3>
              <p className="text-sm text-olive font-light">
                Your print is produced on-demand in our certified print houses with premium materials.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-charcoal text-cream flex items-center justify-center text-2xl font-light">
                4
              </div>
              <div className="mb-4">
                <Check className="w-8 h-8 mx-auto text-olive" />
              </div>
              <h3 className="text-lg font-light text-charcoal mb-2">Delivered To You</h3>
              <p className="text-sm text-olive font-light">
                Carefully packed and delivered to your door within 5-7 business days.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Promise - Full width image */}
      <section className="relative py-32 sm:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/mediterranean-door.jpg"
            alt="Premium quality"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/60 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <p className="text-sm uppercase tracking-[0.2em] text-cream/70 mb-4">
              Our Promise
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-cream mb-6 tracking-tight">
              Premium in every detail
            </h2>
            <div className="space-y-4 text-cream/80 leading-relaxed mb-8">
              <p>
                We only print on the best. 200gsm museum-quality matte paper with a
                subtle texture that gives each print an authentic, tangible expression.
              </p>
              <p>
                Our archival pigment inks ensure that colors remain vibrant and
                accurate for over 100 years. It is not just a print — it is an investment.
              </p>
            </div>
            <Link
              href="/shop"
              className="group inline-flex items-center px-8 py-4 bg-cream text-charcoal text-sm tracking-widest uppercase hover:bg-sand transition-all duration-300"
            >
              View Collection
              <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-olive mb-4">
            Have Questions?
          </p>
          <h2 className="text-3xl sm:text-4xl font-light text-charcoal mb-6 tracking-tight">
            We are here to help
          </h2>
          <p className="text-lg text-olive mb-10 font-light max-w-2xl mx-auto">
            Whether you have questions about our products, delivery, or just want to say hello —
            we always respond within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:hello@framednest.dk"
              className="inline-flex items-center justify-center px-8 py-4 bg-charcoal text-cream text-sm tracking-widest uppercase hover:bg-olive transition-all duration-300"
            >
              Send An Email
            </a>
            <Link
              href="/faq"
              className="inline-flex items-center justify-center px-8 py-4 border border-charcoal text-charcoal text-sm tracking-widest uppercase hover:bg-charcoal hover:text-cream transition-all duration-300"
            >
              View FAQ
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
