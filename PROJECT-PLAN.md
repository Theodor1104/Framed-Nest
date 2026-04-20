# Framed Nest - Komplet Projektplan

> Premium plakat-webshop til kunder med fokus på rigdom og æstetik.
> Målgruppe: Velstående familier og unge med smukke hvide hjem.

---

## Indholdsfortegnelse

1. [Brand](#1-brand)
2. [Brand-identitet](#2-brand-identitet)
3. [Webshop-struktur](#3-webshop-struktur)
4. [Produkter & Prissætning](#4-produkter--prissætning)
5. [Tech Stack](#5-tech-stack)
6. [POD Partner](#6-pod-partner)
7. [Design Collections](#7-design-collections)
8. [Design-kilder](#8-design-kilder)
9. [Marketing-strategi](#9-marketing-strategi)
10. [Budget & Omkostninger](#10-budget--omkostninger)
11. [Lanceringsplan](#11-lanceringsplan)
12. [Næste skridt](#12-næste-skridt)

---

## 1. Brand

### Navn
**Framed Nest** - "Indrammet Rede"

### Betydning
- **Framed** = Indrammet, kunst på væggen
- **Nest** = Rede, hjem, det sted man bygger sammen

### Målgruppe
- Velstående familier (30-45 år)
- Unge par med disponibel indkomst (25-35 år)
- Folk med smukke hvide hjem/lejligheder
- Interesseret i: interiør, design, æstetik, kvalitet over kvantitet
- **VIGTIGT:** Kunder med penge - fokus på rigdom og æstetik

### Positionering
Premium, ikke budget. "Kunst der føles som hjem."

---

## 2. Brand-identitet

### Farvepalette (Warm Earthy)

| Farve | Hex | Brug |
|-------|-----|------|
| Creme/Off-white | #FAF7F2 | Baggrund |
| Warm Sand | #D4C4B0 | Sekundær |
| Soft Terracotta | #C4A484 | Accent |
| Deep Olive | #5C5C4D | Tekst/detaljer |
| Charcoal | #2D2D2D | Primær tekst |

### Tone of Voice
**Minimalistisk med sjæl**
- Få ord, men meningsfulde
- Stilrent og eksklusivt, men ikke koldt
- Små inspirerende touches

**Eksempler:**
- "Kunst der føles som hjem."
- "Din væg. Din stil."
- "Curated for modern living."

### Logo
- Ikon + tekst
- Simpelt rede-ikon eller abstrakt ramme-form
- Clean sans-serif font (Montserrat, Poppins, eller Josefin Sans)

---

## 3. Webshop-struktur

### Sider
| Side | Formål |
|------|--------|
| Forside | Hero-billede, featured collections, bestsellers |
| Shop | Alle produkter med filtre (stil, rum, farve) |
| Collections | Kategorier |
| Om os | Brand-story, værdier |
| FAQ | Levering, rammer, størrelser |
| Kontakt | Simpel formular |

### Navigation
```
Logo | Shop | Collections | Om os | [søg] | [kurv]
```

### Funktioner
- Filtrering (stil, rum, farve, størrelse)
- "Komplet looket" - foreslå matchende prints
- Størrelses-guide
- Framing-tilvalg
- Trustpilot/anmeldelser

---

## 4. Produkter & Prissætning

### Produkttyper

| Produkt | Printify-pris (ca.) | Salgspris | Profit |
|---------|---------------------|-----------|--------|
| Poster 21x30cm (A4) | ~60 kr | 149 kr | ~89 kr |
| Poster 30x40cm | ~75 kr | 199 kr | ~124 kr |
| Poster 50x70cm | ~95 kr | 299 kr | ~204 kr |
| Poster 70x100cm | ~130 kr | 449 kr | ~319 kr |
| Framed 30x40cm | ~180 kr | 399 kr | ~219 kr |
| Framed 50x70cm | ~250 kr | 549 kr | ~299 kr |

### Prissætning
- 2.5-3x markup
- Premium positionering (lidt over konkurrenter)

### Fragt
| Destination | Pris |
|-------------|------|
| Danmark | 39 kr |
| Fri fragt over | 499 kr |
| EU | 59 kr |

---

## 5. Tech Stack

### Platform
Custom-bygget hjemmeside med Printify API integration.
**INGEN lager** - produkter sendes direkte fra Printify/Prodigi til kunden.

### Arkitektur
```
┌─────────────────────────────────────────────┐
│           FRAMED NEST WEBSITE               │
├─────────────────────────────────────────────┤
│  Frontend (Next.js/React)                   │
│  ├── Produktvisning                         │
│  ├── Kurv                                   │
│  ├── Checkout                               │
│  └── Bruger-konto (optional)                │
├─────────────────────────────────────────────┤
│  Backend/API                                │
│  ├── Stripe betaling                        │
│  ├── Printify API integration               │
│  └── Ordre-håndtering                       │
├─────────────────────────────────────────────┤
│  Database                                   │
│  ├── Produkter (synced fra Printify)        │
│  ├── Ordrer                                 │
│  └── Kunder (optional)                      │
└─────────────────────────────────────────────┘
```

### Tech stack
| Del | Teknologi |
|-----|-----------|
| Frontend | Next.js (React) |
| Styling | Tailwind CSS |
| Backend | Next.js API routes |
| Database | Supabase eller PostgreSQL |
| Betaling | Stripe |
| Hosting | Vercel (gratis tier) |
| POD | Printify API v2 |

### Printify API
- Docs: https://developers.printify.com/
- Endpoints: /catalog, /products, /orders, /uploads, /webhooks
- Auth: Personal Access Token eller OAuth 2.0
- Rate limits: 600 requests/minut

### Ordre-flow (INGEN penge i klemme)
```
1. Kunde vælger plakat + størrelse
2. Tilføjer til kurv
3. Checkout → Stripe betaling
4. Din backend modtager betaling ✓
5. Backend kalder Printify API → opret ordre
6. Printify trækker produktpris (du betaler EFTER kunde har betalt)
7. Prodigi printer + sender direkte til kunde
8. Webhook → ordre afsendt → email til kunde
```

---

## 6. POD Partner

### Valg
**Printify** (platform) + **Prodigi** (print provider)

### Hvorfor Prodigi
- Museum-grade papirkvalitet
- EU-baseret (hurtig levering til DK)
- Bruges af museer og fotografer
- Premium finish - matcher "rigdoms"-æstetik

### Printify abonnement
- Start: Free plan
- Opgradér til Premium (~185 kr/md) ved 10+ ordrer/md
- Premium giver 20% rabat på produkter

---

## 7. Design Collections

### Stil: Luxury Minimal
Premium æstetik til smukke hvide hjem. Sofistikeret, roligt, gallerifølelse.
**Målgruppe:** Kunder med penge, fokus på rigdom og æstetik.

### Collections

| Collection | Beskrivelse | Antal |
|------------|-------------|-------|
| Architectural | Bygninger, buer, trapper, skygger i sort/hvid | 8-10 |
| Fine Art Lines | Elegante line art, klassiske skulpturer, torsoer | 8-10 |
| Neutral Abstract | Bløde former, beige/creme/sand toner, tekstur | 8-10 |
| Photography | Sort/hvid fotografier, arkitektur, natur close-ups | 6-8 |
| Typography | Enkelte ord, fashion-inspireret, minimalt | 4-6 |

**Total: 34-44 designs til launch**

### Stil-retningslinjer
| Element | Stil |
|---------|------|
| Farver | Sort, hvid, beige, sand, taupe, soft terracotta |
| Mood | Sofistikeret, roligt, gallerifølelse |
| Kvalitet | Ser dyrt ud, "kunne hænge i et designhotel" |
| Undgå | Cute, farverigt, børneagtigt, kitsch |

### Eksempel-temaer

**Architectural:**
- Hvide græske trapper
- Buer og skygger
- Modernistiske bygninger
- Santorini-æstetik

**Fine Art Lines:**
- Klassisk skulptur (David-detaljer)
- Kvindelig ryg/silhuet
- Hænder der rører
- Græske guder

**Neutral Abstract:**
- Bløde brushstrokes i beige
- Organiske former
- Tekstureret papir-look
- "Wabi-sabi" æstetik

**Photography:**
- Sort/hvid palmeblad
- Arkitektur detaljer
- Ocean/bølger
- Desert dunes

### Inspiration (konkurrenter)
- The Poster Club (premium)
- Desenio "Gallery Wall" serien
- JUNIQE art prints

---

## 8. Design-kilder

### Strategi: Mix

| Collection | Kilde | Pris |
|------------|-------|------|
| Abstract (10 stk) | Midjourney AI | ~80 kr |
| Line Art (10 stk) | Midjourney + Illustrator | ~0 kr |
| Photography (8 stk) | Unsplash + redigering | 0 kr |
| Architectural (8 stk) | Unsplash + sort/hvid edit | 0 kr |
| Typography (6 stk) | Selv i Canva/Illustrator | 0 kr |

**Total design-budget: ~80-150 kr**

### Værktøjer
| Værktøj | Pris | Til |
|---------|------|-----|
| Midjourney | $10/md | AI-genererede designs |
| Canva Pro | Gratis/120 kr/md | Typography, redigering |
| Unsplash | Gratis | Stock photography |
| Remove.bg | Gratis tier | Fjern baggrunde |

### Print-krav
- Minimum opløsning: 300 DPI
- Format: PNG eller JPG
- Størrelse: Mindst 4000x6000px for store posters

---

## 9. Marketing-strategi

### Målgruppe: Kunder med penge

**Demografi:**
- Alder: 25-45
- Indkomst: Top 30%
- Bolig: Ejer eller stor lejlighed
- Lokation: København, Aarhus, store byer

**Interesser:**
- Interiørdesign, arkitektur
- Designmøbler (HAY, Muuto, &Tradition)
- Boligmagasiner (Bo Bedre, RUM)
- Rejser (designhoteller, Santorini, Como-søen)

### Kanaler

| Kanal | Hvorfor | Prioritet |
|-------|---------|-----------|
| Pinterest | Interiør-fokuserede, høj købekraft | Høj |
| Instagram | Æstetik-fokuseret, aspirational | Høj |
| Google SEO | "premium plakater", "gallery wall" | Medium |
| Facebook Ads | Targeting på indkomst, interesser | Medium |
| TikTok | Yngre segment, viral potentiale | Lav |

### Pinterest (primær kanal)

**Hvorfor:**
- 85% af brugere bruger Pinterest til at planlægge køb
- Højeste gennemsnitsindkomst af alle sociale medier
- Interiør er top-kategori

**Strategi:**
- Opret business-konto
- Pins med room mockups (plakater i flotte hjem)
- Boards: "Minimalist Gallery Wall", "Scandinavian Interior", "Luxury Home Art"
- SEO i pin-beskrivelser

### Instagram (brand-building)

**Målgruppe-targeting:**
- Følger: interiør-profiler, designhoteller, arkitektur
- Hashtags: #minimalistinterior #scandinaviandesign #gallerywall #homestyling

**Content:**
| Type | Eksempel |
|------|----------|
| Room mockups | Plakater i lækre hvide hjem |
| Behind the scenes | "New collection dropping" |
| Lifestyle | Kaffe + plakat + morgenlys |
| Reels | "How to style a gallery wall" |

**Æstetik:**
- Kun hvide/lyse hjem
- Aldrig rodet eller "budget"
- Kvalitet > kvantitet

### Google SEO (langsigtigt)

**Keywords:**
- "premium plakater danmark"
- "minimalistiske kunstprint"
- "gallery wall prints"
- "skandinavisk kunst til væggen"

### Influencer-strategi

**Mikro-influencers (1k-10k følgere):**
- Billigere, mere autentiske
- Interiør-profiler med den rigtige æstetik
- Tilbyd gratis plakat mod post

**Målprofiler:**
- Danske interiør-bloggere
- "Hvidt hjem"-profiler på Instagram
- Arkitektur-entusiaster

---

## 10. Budget & Omkostninger

### Startomkostninger (engangsbetaling)

| Post | Pris |
|------|------|
| Domæne (.com + .dk) | ~150 kr/år |
| Designs (Midjourney 1 md) | ~80 kr |
| **Total opstart** | **~230 kr** |

### Løbende omkostninger (månedligt)

| Post | Pris | Hvornår |
|------|------|---------|
| Hosting (Vercel) | 0 kr | Gratis tier |
| Printify | 0 kr | Gratis tier til start |
| Stripe gebyr | 1,4% + 1,8 kr/salg | Kun ved salg |
| Midjourney | ~80 kr | Kun ved nye designs |
| **Total fast/md** | **~0 kr** | Før salg |

### Break-even

| Scenarie | Salg pr. md |
|----------|-------------|
| Dække domæne (150 kr/år) | ~1 plakat |
| Dække evt. Printify Premium | ~2 plakater |
| Profit 5.000 kr/md | ~25 plakater |
| Profit 10.000 kr/md | ~50 plakater |

**Gennemsnits-profit pr. plakat: ~200 kr**

### Risiko

| Investeret | Risiko |
|------------|--------|
| ~230 kr | Ekstremt lav |
| Ingen lager | 0 kr i klemme |
| Ingen forudbetaling | Betales kun ved salg |

---

## 11. Lanceringsplan

### Fase 1: Forberedelse (Uge 1-2)

| Opgave | Status |
|--------|--------|
| Køb domæner (framednest.com + .dk) | [ ] |
| Opret Printify konto | [ ] |
| Opret Stripe konto | [ ] |
| Generer/find 40 designs | [ ] |
| Upload designs til Printify | [ ] |

### Fase 2: Udvikling (Uge 2-4)

| Opgave | Status |
|--------|--------|
| Byg Next.js site (frontend) | [ ] |
| Integrer Printify API | [ ] |
| Integrer Stripe betaling | [ ] |
| Test ordre-flow | [ ] |
| Mobil-optimering | [ ] |

### Fase 3: Content (Uge 3-4)

| Opgave | Status |
|--------|--------|
| Skriv "Om os" tekst | [ ] |
| Lav produkt-mockups (room settings) | [ ] |
| Opret Instagram + Pinterest | [ ] |
| Forbered 10-15 posts | [ ] |

### Fase 4: Soft Launch (Uge 5)

| Opgave | Status |
|--------|--------|
| Test-køb (dig selv) | [ ] |
| Verificer levering + kvalitet | [ ] |
| Fix eventuelle bugs | [ ] |
| Del med venner/familie for feedback | [ ] |

### Fase 5: Launch (Uge 6)

| Opgave | Status |
|--------|--------|
| Go live! | [ ] |
| Post på Instagram + Pinterest | [ ] |
| Del i relevante communities | [ ] |
| Kontakt 5-10 mikro-influencers | [ ] |

### Checkliste før launch

- [ ] Domæner købt og sat op
- [ ] Alle produkter live med priser
- [ ] Stripe betaling fungerer
- [ ] Test-ordre gennemført
- [ ] Mobil fungerer perfekt
- [ ] Juridisk: handelsbetingelser, cookie-politik
- [ ] Instagram + Pinterest klar
- [ ] 10+ posts forberedt

---

## 12. Næste skridt

### Immediate actions (nu)
1. [ ] Tjek domæner: framednest.com + framednest.dk
2. [ ] Køb domæner hvis ledige
3. [ ] Opret Printify konto (gratis)
4. [ ] Opret Stripe konto

### Denne uge
5. [ ] Start Midjourney og generer første designs
6. [ ] Opsæt Next.js projekt
7. [ ] Integrer Printify API

---

## Links & Ressourcer

### Printify
- API Docs: https://developers.printify.com/
- Dashboard: https://printify.com/app/
- Hjælp: https://help.printify.com/

### Domæner
- DK: https://punktum.dk
- COM: https://namecheap.com

### Design
- Midjourney: https://midjourney.com
- Unsplash: https://unsplash.com
- Canva: https://canva.com

### Konkurrenter (inspiration)
- https://theposterclub.com
- https://desenio.dk
- https://juniqe.com

---

## Noter

*Tilføj noter her undervejs...*

---

*Projekt startet: April 2026*
*Sidst opdateret: April 2026*
