'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Mail } from 'lucide-react';

const faqs = [
  {
    category: 'Ordering & Delivery',
    questions: [
      {
        q: 'How long does delivery take?',
        a: 'Orders are typically delivered within 5-7 business days. Your prints are produced on-demand and shipped directly from our print partner in Europe.',
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
        a: 'Absolutely. When your order ships, you will receive an email with tracking information so you can follow your package all the way.',
      },
    ],
  },
  {
    category: 'Products & Quality',
    questions: [
      {
        q: 'What paper do you use?',
        a: 'All our prints are produced on premium 200gsm matte paper with a subtle texture that gives each piece a gallery-quality finish. The paper is FSC-certified and acid-free for long-lasting durability.',
      },
      {
        q: 'What sizes are available?',
        a: 'We offer four standard sizes: 21x30cm (A4), 30x40cm, 50x70cm and 70x100cm. These sizes fit standard frames from most home stores.',
      },
      {
        q: 'Do prints come with a frame?',
        a: 'Prints are sold unframed by default. We offer optional premium oak frames for an additional cost. The frames are made from sustainable wood with a clean, modern profile.',
      },
      {
        q: 'Are the colors accurate compared to what I see online?',
        a: 'We carefully calibrate our prints to match the digital previews. However, slight variations may occur due to differences in screen settings and lighting conditions.',
      },
    ],
  },
  {
    category: 'Returns & Refunds',
    questions: [
      {
        q: 'What is your return policy?',
        a: 'We offer a 14-day return policy on unopened items in original packaging. Since prints are produced on-demand, we cannot accept returns on opened or used items unless they arrive damaged.',
      },
      {
        q: 'What if my print arrives damaged?',
        a: 'Contact us within 48 hours of delivery with photos of the damage. We will send a replacement at no extra cost.',
      },
      {
        q: 'How do I request a refund?',
        a: 'Email us at hello@framednest.dk with your order number and the reason for the refund. We process refunds within 5-7 business days.',
      },
    ],
  },
  {
    category: 'Payment',
    questions: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit cards (Visa, Mastercard, American Express) as well as MobilePay, Apple Pay and Google Pay. All payments are processed securely through Stripe.',
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
    <div className="border-b border-sand/30 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex justify-between items-center text-left group"
      >
        <span className="text-charcoal pr-4 group-hover:text-olive transition-colors">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-olive flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-5' : 'max-h-0'}`}>
        <p className="text-olive leading-relaxed pr-8">{answer}</p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  return (
    <div>
      {/* Hero Header */}
      <div className="relative py-20 sm:py-28 bg-sand/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-olive mb-4">
            Support
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-charcoal mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-olive max-w-2xl mx-auto font-light">
            Find answers to the most common questions about ordering, delivery and our products.
          </p>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="space-y-12">
          {faqs.map((section) => (
            <div key={section.category}>
              <h2 className="text-sm uppercase tracking-[0.2em] text-olive mb-6">
                {section.category}
              </h2>
              <div className="bg-white border border-sand/30 px-6">
                {section.questions.map((item) => (
                  <FAQItem key={item.q} question={item.q} answer={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sand/30 mb-6">
            <Mail className="w-7 h-7 text-olive" />
          </div>
          <h2 className="text-2xl font-light text-charcoal mb-3">
            Still have questions?
          </h2>
          <p className="text-olive mb-8 font-light max-w-md mx-auto">
            We are here to help. Send us a message and we will get back to you within 24 hours.
          </p>
          <a
            href="mailto:hello@framednest.dk"
            className="inline-flex items-center px-8 py-4 bg-charcoal text-cream text-sm tracking-widest uppercase hover:bg-olive transition-all duration-300"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
