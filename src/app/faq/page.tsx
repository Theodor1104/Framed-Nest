'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Mail } from 'lucide-react';

const faqs = [
  {
    category: 'Bestilling & Levering',
    questions: [
      {
        q: 'Hvor lang tid tager levering?',
        a: 'Ordrer leveres typisk inden for 5-7 hverdage. Dine prints produceres on-demand og sendes direkte fra vores printpartner i Europa.',
      },
      {
        q: 'Leverer I internationalt?',
        a: 'Ja, vi sender til de fleste europæiske lande. Forsendelsesomkostninger varierer efter lokation og beregnes ved checkout.',
      },
      {
        q: 'Er fragt gratis?',
        a: 'Ja! Vi tilbyder gratis fragt på alle ordrer over 499 kr. Ordrer under dette beløb har en fast fragtpris på 39 kr.',
      },
      {
        q: 'Kan jeg spore min ordre?',
        a: 'Absolut. Når din ordre afsendes, modtager du en email med tracking-information, så du kan følge din pakke hele vejen.',
      },
    ],
  },
  {
    category: 'Produkter & Kvalitet',
    questions: [
      {
        q: 'Hvilket papir bruger I?',
        a: 'Alle vores prints produceres på premium 200gsm mat papir med en subtil tekstur, der giver hvert stykke en galleri-kvalitet finish. Papiret er FSC-certificeret og syrefrit for lang holdbarhed.',
      },
      {
        q: 'Hvilke størrelser findes?',
        a: 'Vi tilbyder fire standardstørrelser: 21x30cm (A4), 30x40cm, 50x70cm og 70x100cm. Disse størrelser passer til standardrammer fra de fleste boligbutikker.',
      },
      {
        q: 'Kommer prints med ramme?',
        a: 'Prints sælges som standard uden ramme. Vi tilbyder valgfri premium egetræsrammer mod et tillæg. Rammerne er lavet af bæredygtigt træ med en ren, moderne profil.',
      },
      {
        q: 'Er farverne præcise i forhold til det jeg ser online?',
        a: 'Vi kalibrerer vores prints omhyggeligt for at matche de digitale previews. Dog kan små variationer forekomme på grund af forskelle i skærmindstillinger og lysforhold.',
      },
    ],
  },
  {
    category: 'Returnering & Refundering',
    questions: [
      {
        q: 'Hvad er jeres returpolitik?',
        a: 'Vi tilbyder 14 dages returret på uåbnede varer i original emballage. Da prints produceres på bestilling, kan vi ikke acceptere returneringer af åbnede eller brugte varer, medmindre de ankommer beskadiget.',
      },
      {
        q: 'Hvad hvis mit print ankommer beskadiget?',
        a: 'Kontakt os inden for 48 timer efter levering med fotos af skaden. Vi sender en erstatning uden ekstra omkostninger.',
      },
      {
        q: 'Hvordan anmoder jeg om refundering?',
        a: 'Send os en email på hello@framednest.dk med dit ordrenummer og årsagen til refunderingen. Vi behandler refunderinger inden for 5-7 hverdage.',
      },
    ],
  },
  {
    category: 'Betaling',
    questions: [
      {
        q: 'Hvilke betalingsmetoder accepterer I?',
        a: 'Vi accepterer alle større kreditkort (Visa, Mastercard, American Express) samt MobilePay, Apple Pay og Google Pay. Alle betalinger behandles sikkert gennem Stripe.',
      },
      {
        q: 'Er mine betalingsoplysninger sikre?',
        a: 'Ja, vi bruger Stripe til betalingsbehandling, som er PCI DSS Level 1 certificeret - det højeste niveau af sikkerhedscertificering tilgængeligt.',
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
            Ofte Stillede Spørgsmål
          </h1>
          <p className="text-lg text-olive max-w-2xl mx-auto font-light">
            Find svar på de mest almindelige spørgsmål om bestilling, levering og vores produkter.
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
            Har du stadig spørgsmål?
          </h2>
          <p className="text-olive mb-8 font-light max-w-md mx-auto">
            Vi er her for at hjælpe. Skriv til os, og vi vender tilbage inden for 24 timer.
          </p>
          <a
            href="mailto:hello@framednest.dk"
            className="inline-flex items-center px-8 py-4 bg-charcoal text-cream text-sm tracking-widest uppercase hover:bg-olive transition-all duration-300"
          >
            Kontakt Os
          </a>
        </div>
      </div>
    </div>
  );
}
