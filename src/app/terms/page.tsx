import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-light tracking-wide text-charcoal mb-8">
          Terms of Service
        </h1>

        <div className="prose prose-olive max-w-none space-y-8 text-olive">
          <p className="text-sm">Last updated: April 2026</p>

          <section>
            <h2 className="text-xl font-medium text-charcoal mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing or using the Framed Nest website and services, you agree to be bound
              by these Terms of Service. If you do not agree to these terms, please do not use
              our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-charcoal mb-4">2. Products and Orders</h2>
            <p>
              All products are made to order and produced by our print partner. We strive to
              ensure accurate product descriptions and images, but slight variations may occur
              due to the nature of print-on-demand production.
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Prices are displayed in DKK and include VAT</li>
              <li>We reserve the right to modify prices without notice</li>
              <li>Orders are confirmed via email after payment is processed</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-charcoal mb-4">3. Shipping and Delivery</h2>
            <p>
              Orders are typically delivered within 5-7 business days. Delivery times may vary
              based on location and carrier availability. Shipping costs are calculated at checkout.
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Free shipping on orders over 499 kr</li>
              <li>Risk of loss passes to you upon delivery</li>
              <li>You are responsible for providing accurate shipping information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-charcoal mb-4">4. Returns and Refunds</h2>
            <p>
              We accept returns within 14 days of delivery for unopened items in original packaging.
              Since our products are made to order, we cannot accept returns on opened or used items
              unless they arrive damaged.
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Contact us within 48 hours if your item arrives damaged</li>
              <li>Provide photos of damaged items for replacement</li>
              <li>Refunds are processed within 5-7 business days</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-charcoal mb-4">5. Intellectual Property</h2>
            <p>
              All content on this website, including designs, images, text, and graphics, is owned
              by Framed Nest or our licensors and is protected by copyright laws. You may not
              reproduce, distribute, or create derivative works without our written permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-charcoal mb-4">6. User Conduct</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Use our website for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with the proper functioning of the website</li>
              <li>Transmit viruses or other harmful code</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-charcoal mb-4">7. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Framed Nest shall not be liable for any
              indirect, incidental, special, or consequential damages arising from your use of
              our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-charcoal mb-4">8. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Changes will be effective
              immediately upon posting to the website. Your continued use constitutes acceptance
              of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-charcoal mb-4">9. Governing Law</h2>
            <p>
              These terms are governed by the laws of Denmark. Any disputes shall be resolved
              in the courts of Denmark.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-charcoal mb-4">10. Contact</h2>
            <p>
              For questions about these terms, please{' '}
              <Link href="/contact" className="underline hover:text-charcoal">
                contact us
              </Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
