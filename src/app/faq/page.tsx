'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    category: 'Orders & Shipping',
    questions: [
      {
        q: 'How long does shipping take?',
        a: 'Orders are typically delivered within 5-7 business days. Your prints are produced on demand and shipped directly from our print partner in Europe.',
      },
      {
        q: 'Do you ship internationally?',
        a: 'Yes, we ship to most European countries. Shipping costs vary by location and are calculated at checkout.',
      },
      {
        q: 'Is shipping free?',
        a: 'Yes! We offer free shipping on all orders over 499 kr. Orders under this amount have a flat shipping rate of 39 kr.',
      },
      {
        q: 'Can I track my order?',
        a: 'Absolutely. Once your order ships, you will receive an email with tracking information so you can follow your package every step of the way.',
      },
    ],
  },
  {
    category: 'Products & Quality',
    questions: [
      {
        q: 'What paper do you use?',
        a: 'All our prints are produced on premium 200gsm matte paper with a subtle texture that gives each piece a gallery-quality finish. The paper is FSC certified and acid-free for longevity.',
      },
      {
        q: 'What sizes are available?',
        a: 'We offer four standard sizes: 21x30cm (A4), 30x40cm, 50x70cm, and 70x100cm. These sizes fit standard frames available at most home stores.',
      },
      {
        q: 'Do prints come framed?',
        a: 'Prints are sold unframed by default. We offer optional premium oak frames for an additional cost. Frames are made from sustainably sourced wood with a clean, modern profile.',
      },
      {
        q: 'Are the colors accurate to what I see online?',
        a: 'We calibrate our prints carefully to match the digital previews. However, slight variations may occur due to differences in screen settings and lighting conditions.',
      },
    ],
  },
  {
    category: 'Returns & Refunds',
    questions: [
      {
        q: 'What is your return policy?',
        a: 'We offer a 14-day return policy for unopened items in original packaging. Since prints are made to order, we cannot accept returns on opened or used items unless they arrive damaged.',
      },
      {
        q: 'What if my print arrives damaged?',
        a: 'Contact us within 48 hours of delivery with photos of the damage. We will send a replacement at no extra cost.',
      },
      {
        q: 'How do I request a refund?',
        a: 'Email us at hello@framednest.com with your order number and reason for the refund. We process refunds within 5-7 business days.',
      },
    ],
  },
  {
    category: 'Payment',
    questions: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit cards (Visa, Mastercard, American Express) as well as Apple Pay and Google Pay. All payments are processed securely through Stripe.',
      },
      {
        q: 'Is my payment information secure?',
        a: 'Yes, we use Stripe for payment processing, which is PCI DSS Level 1 certified - the highest level of security certification available.',
      },
    ],
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-sand/50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex justify-between items-center text-left"
      >
        <span className="text-charcoal font-medium pr-4">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-olive flex-shrink-0 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="pb-4 pr-8">
          <p className="text-olive leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-light tracking-wide text-charcoal mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-olive">
            Find answers to common questions about orders, shipping, and our products.
          </p>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-10">
          {faqs.map((section) => (
            <div key={section.category}>
              <h2 className="text-lg font-medium text-charcoal mb-4">
                {section.category}
              </h2>
              <div className="bg-sand/10">
                {section.questions.map((item) => (
                  <FAQItem key={item.q} question={item.q} answer={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-16 text-center p-8 bg-sand/20">
          <h2 className="text-xl font-light text-charcoal mb-2">
            Still have questions?
          </h2>
          <p className="text-olive mb-6">
            We are here to help. Reach out and we will get back to you within 24 hours.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-charcoal text-cream text-sm tracking-wide hover:bg-olive transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
