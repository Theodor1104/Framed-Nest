export default function AboutPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl font-light tracking-wide text-charcoal mb-6">
            About Framed Nest
          </h1>
          <p className="text-lg text-olive font-light">
            Art that feels like home.
          </p>
        </div>

        {/* Story */}
        <div className="prose prose-lg max-w-none">
          <div className="space-y-6 text-olive leading-relaxed">
            <p>
              We believe that the walls of your home should tell your story. Not
              through cluttered galleries or forgettable prints, but through
              carefully chosen pieces that bring sophistication, warmth, and
              intention to every room.
            </p>

            <p>
              Framed Nest was born from a simple observation: finding quality art
              prints that feel both timeless and modern should not be difficult.
              Too often, the choice is between mass-produced posters that lack
              soul, or gallery pieces that break the bank.
            </p>

            <p>
              We curate each piece in our collection with one question in mind:
              would this belong in a beautifully designed home? If it would not
              feel at home in a Copenhagen apartment or a minimalist villa, it
              does not belong in our collection.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="text-lg font-medium text-charcoal mb-2">Curated</h3>
            <p className="text-sm text-olive">
              Every print is hand-selected to meet our standards of timeless
              design.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-medium text-charcoal mb-2">Quality</h3>
            <p className="text-sm text-olive">
              Museum-grade paper and premium finishes that last.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-medium text-charcoal mb-2">Intentional</h3>
            <p className="text-sm text-olive">
              No clutter, no compromise. Just pieces that matter.
            </p>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <p className="text-olive mb-4">Questions? We would love to hear from you.</p>
          <a
            href="mailto:hello@framednest.com"
            className="text-charcoal border-b border-charcoal pb-1 hover:text-olive hover:border-olive transition-colors"
          >
            hello@framednest.com
          </a>
        </div>
      </div>
    </div>
  );
}
