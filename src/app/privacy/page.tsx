import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-light tracking-wide text-charcoal mb-8">
          Privacy Policy
        </h1>

        <div className="prose prose-olive max-w-none space-y-8 text-olive">
          <p className="text-sm">Last updated: April 2026</p>

          <section>
            <h2 className="text-xl font-medium text-charcoal mb-4">1. Introduction</h2>
            <p>
              At Framed Nest, we respect your privacy and are committed to protecting your personal data.
              This privacy policy explains how we collect, use, and safeguard your information when you
              visit our website or make a purchase.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-charcoal mb-4">2. Information We Collect</h2>
            <p>We collect information you provide directly to us, including:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Name and contact information (email, phone number)</li>
              <li>Shipping and billing addresses</li>
              <li>Payment information (processed securely by Stripe)</li>
              <li>Order history and preferences</li>
              <li>Communications you send to us</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-charcoal mb-4">3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Process and fulfill your orders</li>
              <li>Send order confirmations and shipping updates</li>
              <li>Respond to your questions and requests</li>
              <li>Improve our website and services</li>
              <li>Send marketing communications (with your consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-charcoal mb-4">4. Information Sharing</h2>
            <p>
              We do not sell your personal information. We may share your data with:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Our print partner (Printify/Prodigi) to fulfill orders</li>
              <li>Payment processors (Stripe) to process transactions</li>
              <li>Shipping carriers to deliver your orders</li>
              <li>Service providers who assist our operations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-charcoal mb-4">5. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information.
              All payment transactions are encrypted using SSL technology and processed through
              Stripe, which is PCI DSS Level 1 certified.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-charcoal mb-4">6. Cookies</h2>
            <p>
              We use cookies to enhance your browsing experience, analyze site traffic, and
              personalize content. You can control cookie preferences through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-charcoal mb-4">7. Your Rights</h2>
            <p>Under GDPR, you have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Request data portability</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-charcoal mb-4">8. Contact Us</h2>
            <p>
              If you have questions about this privacy policy or wish to exercise your rights,
              please contact us at{' '}
              <Link href="/contact" className="underline hover:text-charcoal">
                hello@framednest.com
              </Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
