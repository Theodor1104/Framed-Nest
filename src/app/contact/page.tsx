'use client';

import { useState } from 'react';
import { Mail, Clock, Send, Loader2 } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    orderNumber: '',
    subject: 'general',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="py-24 sm:py-32">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-olive/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Send className="w-8 h-8 text-olive" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-light text-charcoal mb-4">
            Message Sent
          </h1>
          <p className="text-olive mb-8">
            Thank you for reaching out. We will get back to you within 24 hours.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                name: '',
                email: '',
                orderNumber: '',
                subject: 'general',
                message: '',
              });
            }}
            className="text-charcoal hover:text-olive transition-colors underline"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-light tracking-wide text-charcoal mb-4">
            Contact Us
          </h1>
          <p className="text-olive max-w-xl mx-auto">
            Have a question or need help with your order? We are here to assist you.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="md:col-span-1 space-y-8">
            <div>
              <div className="flex items-center mb-3">
                <Mail className="w-5 h-5 text-olive mr-3" />
                <h3 className="font-medium text-charcoal">Email</h3>
              </div>
              <p className="text-olive text-sm">hello@framednest.com</p>
            </div>

            <div>
              <div className="flex items-center mb-3">
                <Clock className="w-5 h-5 text-olive mr-3" />
                <h3 className="font-medium text-charcoal">Response Time</h3>
              </div>
              <p className="text-olive text-sm">
                We typically respond within 24 hours during business days (Mon-Fri).
              </p>
            </div>

            <div className="p-4 bg-sand/20">
              <p className="text-sm text-olive">
                <strong className="text-charcoal">Quick tip:</strong> Check our{' '}
                <a href="/faq" className="underline hover:text-charcoal">
                  FAQ page
                </a>{' '}
                for instant answers to common questions.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-sand bg-transparent text-charcoal focus:outline-none focus:border-charcoal transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-sand bg-transparent text-charcoal focus:outline-none focus:border-charcoal transition-colors"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="orderNumber" className="block text-sm font-medium text-charcoal mb-2">
                    Order Number (optional)
                  </label>
                  <input
                    type="text"
                    id="orderNumber"
                    placeholder="e.g. FN-12345"
                    value={formData.orderNumber}
                    onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                    className="w-full px-4 py-3 border border-sand bg-transparent text-charcoal placeholder:text-olive/50 focus:outline-none focus:border-charcoal transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-charcoal mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 border border-sand bg-transparent text-charcoal focus:outline-none focus:border-charcoal transition-colors"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="order">Order Status</option>
                    <option value="return">Returns & Refunds</option>
                    <option value="product">Product Question</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-sand bg-transparent text-charcoal focus:outline-none focus:border-charcoal transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3 bg-charcoal text-cream text-sm tracking-wide hover:bg-olive transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
