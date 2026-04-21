import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const collections = [
  {
    name: 'Architectural',
    slug: 'architectural',
    description: 'Clean lines, striking shadows, and timeless structures.',
    count: 12,
    image: '/images/santorini-steps.jpg',
  },
  {
    name: 'Fine Art Lines',
    slug: 'fine-art-lines',
    description: 'Elegant line art inspired by classical sculpture and human form.',
    count: 10,
    image: '/images/dancing-figure.jpg',
  },
  {
    name: 'Neutral Abstract',
    slug: 'neutral-abstract',
    description: 'Soft organic shapes in earthy, calming tones.',
    count: 8,
    image: '/images/abstract-form.jpg',
  },
  {
    name: 'Photography',
    slug: 'photography',
    description: 'Striking black and white captures of nature and architecture.',
    count: 10,
    image: '/images/desert-dunes.jpg',
  },
  {
    name: 'Typography',
    slug: 'typography',
    description: 'Minimalist words and statements for modern spaces.',
    count: 6,
    image: '/images/typography-breathe.jpg',
  },
];

export default function CollectionsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <div className="relative py-20 sm:py-28 bg-sand/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-olive mb-4">
            Curated For You
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-charcoal mb-6">
            Our Collections
          </h1>
          <p className="text-lg text-olive max-w-2xl mx-auto font-light">
            Each collection is thoughtfully curated to bring a unique aesthetic to your space.
            Find the perfect style that speaks to you.
          </p>
        </div>
      </div>

      {/* Featured Collection - Large */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link href={`/collections/${collections[0].slug}`} className="group block">
          <div className="relative aspect-[21/9] overflow-hidden">
            <Image
              src={collections[0].image}
              alt={collections[0].name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal/70 via-charcoal/40 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="px-8 sm:px-12 lg:px-16 max-w-xl">
                <p className="text-sm uppercase tracking-[0.2em] text-cream/80 mb-3">
                  Featured Collection
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-cream mb-4">
                  {collections[0].name}
                </h2>
                <p className="text-cream/80 mb-6 font-light">
                  {collections[0].description}
                </p>
                <span className="inline-flex items-center gap-2 text-sm text-cream uppercase tracking-widest group-hover:gap-3 transition-all">
                  Explore Collection
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Collections Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {collections.slice(1).map((collection) => (
            <Link
              key={collection.slug}
              href={`/collections/${collection.slug}`}
              className="group"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
                  <p className="text-xs uppercase tracking-wider text-cream/70 mb-2">
                    {collection.count} prints
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-light text-cream mb-2">
                    {collection.name}
                  </h2>
                  <p className="text-sm text-cream/80 mb-4 max-w-sm font-light">
                    {collection.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-xs text-cream uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    Se kollektion
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
