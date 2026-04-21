import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Leaf, Award, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 sm:py-32 bg-sand/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-olive mb-4">
                Vores Historie
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-charcoal mb-6">
                Art that feels
                <br />
                <span className="italic">like home</span>
              </h1>
              <p className="text-lg text-olive font-light leading-relaxed max-w-lg">
                Vi tror på, at væggene i dit hjem skal fortælle din historie.
                Ikke gennem rodet eller forglemmeligt kunst, men gennem
                omhyggeligt udvalgte stykker der bringer sofistikation og varme.
              </p>
            </div>
            <div className="aspect-[4/5] relative overflow-hidden">
              <Image
                src="/images/spiral-staircase.jpg"
                alt="Framed Nest studio"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="aspect-[4/5] relative overflow-hidden order-2 lg:order-1">
              <Image
                src="/images/grecian-arches.jpg"
                alt="Curated art prints"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-sm uppercase tracking-[0.2em] text-olive mb-4">
                Vores Mission
              </p>
              <h2 className="text-3xl sm:text-4xl font-light text-charcoal mb-6 tracking-tight">
                Kurateret med omhu
              </h2>
              <div className="space-y-4 text-olive leading-relaxed">
                <p>
                  Framed Nest blev født af en simpel observation: at finde kvalitets
                  kunstprint der føles både tidløse og moderne burde ikke være svært.
                </p>
                <p>
                  For ofte er valget mellem masseproducerede plakater uden sjæl,
                  eller galleriværker der sprænger budgettet. Vi ønskede at skabe
                  et tredje alternativ.
                </p>
                <p>
                  Vi kuraterer hvert eneste stykke i vores kollektion med ét
                  spørgsmål i tankerne: ville dette høre hjemme i et smukt
                  designet hjem? Hvis det ikke ville føles rigtigt i en
                  københavnsk lejlighed eller en minimalistisk villa,
                  hører det ikke til i vores kollektion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 sm:py-32 bg-charcoal text-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.2em] text-sand mb-4">
              Hvad Vi Står For
            </p>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight">
              Vores Værdier
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-cream/10 flex items-center justify-center">
                <Award className="w-8 h-8 text-sand" />
              </div>
              <h3 className="text-xl font-light mb-3">Kvalitet</h3>
              <p className="text-cream/70 font-light">
                Museum-kvalitet papir og arkiv-blæk der holder i generationer.
                Vi går aldrig på kompromis med materialer.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-cream/10 flex items-center justify-center">
                <Heart className="w-8 h-8 text-sand" />
              </div>
              <h3 className="text-xl font-light mb-3">Kurateret</h3>
              <p className="text-cream/70 font-light">
                Hvert print er håndudvalgt til at møde vores standarder
                for tidløst design og æstetisk skønhed.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-cream/10 flex items-center justify-center">
                <Leaf className="w-8 h-8 text-sand" />
              </div>
              <h3 className="text-xl font-light mb-3">Bæredygtig</h3>
              <p className="text-cream/70 font-light">
                Print-on-demand betyder nul spild. FSC-certificeret papir
                og CO2-neutral levering.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Promise */}
      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-olive mb-4">
                Vores Løfte
              </p>
              <h2 className="text-3xl sm:text-4xl font-light text-charcoal mb-6 tracking-tight">
                Premium i hver detalje
              </h2>
              <div className="space-y-4 text-olive leading-relaxed mb-8">
                <p>
                  Alle vores prints produceres på 200gsm museum-kvalitet mat papir
                  med arkiv pigmentblæk der holder i over 100 år.
                </p>
                <p>
                  Vores rammer er håndlavede i massiv træ med shatter-resistent
                  akrylglas og kommer klar til ophængning.
                </p>
              </div>
              <Link
                href="/shop"
                className="group inline-flex items-center px-8 py-4 bg-charcoal text-cream text-sm tracking-widest uppercase hover:bg-olive transition-all duration-300"
              >
                Udforsk Kollektionen
                <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="aspect-[4/5] relative overflow-hidden">
              <Image
                src="/images/mediterranean-door.jpg"
                alt="Premium quality prints"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 sm:py-32 bg-sand/20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-olive mb-4">
            Kontakt Os
          </p>
          <h2 className="text-3xl sm:text-4xl font-light text-charcoal mb-6 tracking-tight">
            Vi vil gerne høre fra dig
          </h2>
          <p className="text-olive mb-8 font-light">
            Har du spørgsmål om vores prints, levering eller andet?
            Vi svarer altid inden for 24 timer.
          </p>
          <a
            href="mailto:hello@framednest.dk"
            className="inline-flex items-center px-8 py-4 border border-charcoal text-charcoal text-sm tracking-widest uppercase hover:bg-charcoal hover:text-cream transition-all duration-300"
          >
            hello@framednest.dk
          </a>
        </div>
      </section>
    </div>
  );
}
