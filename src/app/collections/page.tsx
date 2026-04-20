import Link from 'next/link';

const collections = [
  {
    name: 'Architectural',
    slug: 'architectural',
    description: 'Clean lines, striking shadows, and timeless structures.',
    count: 12,
  },
  {
    name: 'Fine Art Lines',
    slug: 'fine-art-lines',
    description: 'Elegant line art inspired by classical sculpture and human form.',
    count: 10,
  },
  {
    name: 'Neutral Abstract',
    slug: 'neutral-abstract',
    description: 'Soft organic shapes in earthy, calming tones.',
    count: 8,
  },
  {
    name: 'Photography',
    slug: 'photography',
    description: 'Striking black and white captures of nature and architecture.',
    count: 10,
  },
  {
    name: 'Typography',
    slug: 'typography',
    description: 'Minimalist words and statements for modern spaces.',
    count: 6,
  },
];

export default function CollectionsPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl font-light tracking-wide text-charcoal mb-4">
            Collections
          </h1>
          <p className="text-olive max-w-xl mx-auto">
            Explore our carefully curated collections, each designed to bring a
            unique aesthetic to your space.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {collections.map((collection) => (
            <Link
              key={collection.slug}
              href={`/collections/${collection.slug}`}
              className="group"
            >
              <div className="aspect-[16/9] bg-sand/30 flex items-center justify-center border border-sand/50 group-hover:border-terracotta transition-colors">
                <div className="text-center px-8">
                  <h2 className="text-2xl sm:text-3xl font-light text-charcoal mb-2">
                    {collection.name}
                  </h2>
                  <p className="text-sm text-olive mb-4 max-w-sm">
                    {collection.description}
                  </p>
                  <span className="text-xs text-olive/70">
                    {collection.count} prints
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
