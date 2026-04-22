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
            Vores Historie
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-cream mb-6">
            Art that feels
            <br />
            <span className="italic">like home</span>
          </h1>
          <p className="text-lg sm:text-xl text-cream/80 font-light max-w-2xl mx-auto">
            Vi skaber kuraterede kunstprint til dem, der tror på at vægge fortjener mere end det ordinære.
          </p>
        </div>
      </section>

      {/* Intro Stats */}
      <section className="py-16 bg-charcoal text-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl sm:text-5xl font-light mb-2">500+</p>
              <p className="text-sm text-cream/60 uppercase tracking-wider">Unikke Designs</p>
            </div>
            <div>
              <p className="text-4xl sm:text-5xl font-light mb-2">10k+</p>
              <p className="text-sm text-cream/60 uppercase tracking-wider">Glade Kunder</p>
            </div>
            <div>
              <p className="text-4xl sm:text-5xl font-light mb-2">100%</p>
              <p className="text-sm text-cream/60 uppercase tracking-wider">Bæredygtigt</p>
            </div>
            <div>
              <p className="text-4xl sm:text-5xl font-light mb-2">4.9</p>
              <p className="text-sm text-cream/60 uppercase tracking-wider">Trustpilot Score</p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-olive mb-4">
                Hvordan Det Startede
              </p>
              <h2 className="text-3xl sm:text-4xl font-light text-charcoal mb-6 tracking-tight">
                Fra frustration til passion
              </h2>
              <div className="space-y-4 text-olive leading-relaxed">
                <p>
                  Framed Nest startede i 2023 med en simpel frustration: hvorfor er det
                  så svært at finde kvalitetskunst til hjemmet, der ikke koster en formue
                  eller ligner alt andet derude?
                </p>
                <p>
                  Vi var trætte af masseproducerede plakater uden sjæl og galleripriser
                  der sprængte budgettet. Så vi besluttede at skabe et tredje alternativ —
                  kuraterede kunstprint i museum-kvalitet til priser, der giver mening.
                </p>
                <p>
                  I dag arbejder vi med talentfulde kunstnere og fotografer fra hele verden
                  for at bringe unikke, tidløse værker ind i danske hjem.
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
              Hvad Vi Står For
            </p>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-charcoal">
              Vores Værdier
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="bg-white p-8 sm:p-10">
              <div className="w-14 h-14 mb-6 rounded-full bg-sand/30 flex items-center justify-center">
                <Award className="w-7 h-7 text-charcoal" />
              </div>
              <h3 className="text-xl font-light text-charcoal mb-3">Kompromisløs Kvalitet</h3>
              <p className="text-olive font-light leading-relaxed">
                200gsm museum-kvalitet mat papir. Arkiv pigmentblæk der holder i over 100 år.
                Håndlavede rammer i massiv træ. Vi går aldrig på kompromis.
              </p>
            </div>
            <div className="bg-white p-8 sm:p-10">
              <div className="w-14 h-14 mb-6 rounded-full bg-sand/30 flex items-center justify-center">
                <Heart className="w-7 h-7 text-charcoal" />
              </div>
              <h3 className="text-xl font-light text-charcoal mb-3">Omhyggeligt Kurateret</h3>
              <p className="text-olive font-light leading-relaxed">
                Hvert eneste print i vores kollektion er håndudvalgt. Vi spørger altid:
                ville dette høre hjemme i et smukt designet hjem?
              </p>
            </div>
            <div className="bg-white p-8 sm:p-10">
              <div className="w-14 h-14 mb-6 rounded-full bg-sand/30 flex items-center justify-center">
                <Leaf className="w-7 h-7 text-charcoal" />
              </div>
              <h3 className="text-xl font-light text-charcoal mb-3">Bæredygtig Produktion</h3>
              <p className="text-olive font-light leading-relaxed">
                Print-on-demand betyder nul spild fra usolgte varer. FSC-certificeret papir,
                genanvendelig emballage og CO2-neutral levering.
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
              Fra Os Til Dig
            </p>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-charcoal">
              Sådan Virker Det
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
              <h3 className="text-lg font-light text-charcoal mb-2">Vælg Dit Print</h3>
              <p className="text-sm text-olive font-light">
                Udforsk vores kuraterede kollektion og find det perfekte kunstværk til dit rum.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-charcoal text-cream flex items-center justify-center text-2xl font-light">
                2
              </div>
              <div className="mb-4">
                <Home className="w-8 h-8 mx-auto text-olive" />
              </div>
              <h3 className="text-lg font-light text-charcoal mb-2">Tilpas Størrelse</h3>
              <p className="text-sm text-olive font-light">
                Vælg mellem fire størrelser og tilføj evt. en premium ramme i eg, sort eller hvid.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-charcoal text-cream flex items-center justify-center text-2xl font-light">
                3
              </div>
              <div className="mb-4">
                <Package className="w-8 h-8 mx-auto text-olive" />
              </div>
              <h3 className="text-lg font-light text-charcoal mb-2">Vi Producerer</h3>
              <p className="text-sm text-olive font-light">
                Dit print produceres on-demand i vores certificerede trykkerier med premium materialer.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-charcoal text-cream flex items-center justify-center text-2xl font-light">
                4
              </div>
              <div className="mb-4">
                <Check className="w-8 h-8 mx-auto text-olive" />
              </div>
              <h3 className="text-lg font-light text-charcoal mb-2">Leveret Til Dig</h3>
              <p className="text-sm text-olive font-light">
                Omhyggeligt pakket og leveret til din dør inden for 5-7 hverdage.
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
              Vores Løfte
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-cream mb-6 tracking-tight">
              Premium i hver eneste detalje
            </h2>
            <div className="space-y-4 text-cream/80 leading-relaxed mb-8">
              <p>
                Vi printer kun på det bedste. 200gsm museum-kvalitet mat papir med en
                subtil tekstur der giver hvert print et autentisk, håndgribeligt udtryk.
              </p>
              <p>
                Vores arkiv pigmentblæk sikrer at farverne forbliver levende og
                præcise i over 100 år. Det er ikke bare et print — det er en investering.
              </p>
            </div>
            <Link
              href="/shop"
              className="group inline-flex items-center px-8 py-4 bg-cream text-charcoal text-sm tracking-widest uppercase hover:bg-sand transition-all duration-300"
            >
              Se Kollektionen
              <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 sm:py-32 bg-sand/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.2em] text-olive mb-4">
              Hvad Vores Kunder Siger
            </p>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-charcoal">
              Ægte Anmeldelser
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-olive leading-relaxed mb-6 italic">
                &ldquo;Kvaliteten overgik alle mine forventninger. Papiret føles premium,
                og farverne er præcis som på billedet. Vil helt sikkert købe igen!&rdquo;
              </p>
              <p className="text-charcoal font-medium">— Marie S.</p>
              <p className="text-sm text-olive">København</p>
            </div>
            <div className="bg-white p-8">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-olive leading-relaxed mb-6 italic">
                &ldquo;Endelig en webshop med kunstprint der ikke ligner alt det andet!
                Elsker den minimalistiske stil og den hurtige levering.&rdquo;
              </p>
              <p className="text-charcoal font-medium">— Thomas K.</p>
              <p className="text-sm text-olive">Aarhus</p>
            </div>
            <div className="bg-white p-8">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-olive leading-relaxed mb-6 italic">
                &ldquo;Købte tre prints til stuen og de ser fantastiske ud sammen.
                Rammen i egetræ er virkelig flot kvalitet. Meget tilfreds!&rdquo;
              </p>
              <p className="text-charcoal font-medium">— Line J.</p>
              <p className="text-sm text-olive">Odense</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-olive mb-4">
            Har Du Spørgsmål?
          </p>
          <h2 className="text-3xl sm:text-4xl font-light text-charcoal mb-6 tracking-tight">
            Vi er her for at hjælpe
          </h2>
          <p className="text-lg text-olive mb-10 font-light max-w-2xl mx-auto">
            Uanset om du har spørgsmål om vores produkter, levering, eller bare vil sige hej —
            vi svarer altid inden for 24 timer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:hello@framednest.dk"
              className="inline-flex items-center justify-center px-8 py-4 bg-charcoal text-cream text-sm tracking-widest uppercase hover:bg-olive transition-all duration-300"
            >
              Send En Email
            </a>
            <Link
              href="/faq"
              className="inline-flex items-center justify-center px-8 py-4 border border-charcoal text-charcoal text-sm tracking-widest uppercase hover:bg-charcoal hover:text-cream transition-all duration-300"
            >
              Se FAQ
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
