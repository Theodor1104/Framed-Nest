// Centralized product data - will be replaced with Printify API data

export interface Variant {
  id: number;
  title: string;
  price: number;
  framedPrice: number;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  collection: string;
  image: string;
  variants: Variant[];
}

// Standard variants for different product types
const standardVariants: Variant[] = [
  { id: 1, title: '21x30cm', price: 149, framedPrice: 299 },
  { id: 2, title: '30x40cm', price: 199, framedPrice: 399 },
  { id: 3, title: '50x70cm', price: 299, framedPrice: 549 },
  { id: 4, title: '70x100cm', price: 449, framedPrice: 749 },
];

const photographyVariants: Variant[] = [
  { id: 1, title: '30x40cm', price: 249, framedPrice: 449 },
  { id: 2, title: '50x70cm', price: 349, framedPrice: 599 },
  { id: 3, title: '70x100cm', price: 499, framedPrice: 799 },
];

const typographyVariants: Variant[] = [
  { id: 1, title: '21x30cm', price: 99, framedPrice: 249 },
  { id: 2, title: '30x40cm', price: 149, framedPrice: 349 },
  { id: 3, title: '50x70cm', price: 199, framedPrice: 449 },
];

export const products: Product[] = [
  // Architectural Collection
  {
    id: '1',
    title: 'Santorini Steps',
    description: 'Minimalist architectural print featuring the iconic white stairs of Santorini. This timeless piece captures the essence of Mediterranean elegance, perfect for sophisticated modern interiors.',
    collection: 'Architectural',
    image: '/images/santorini-steps.jpg',
    variants: standardVariants,
  },
  {
    id: '5',
    title: 'Grecian Arches',
    description: 'White arched doorways bathed in soft Mediterranean light. A celebration of classical architecture that brings timeless elegance to your walls.',
    collection: 'Architectural',
    image: '/images/grecian-arches.jpg',
    variants: standardVariants,
  },
  {
    id: '9',
    title: 'Modern Structure',
    description: 'Bold brutalist architecture captured in dramatic shadows. A statement piece for those who appreciate the beauty of contemporary design.',
    collection: 'Architectural',
    image: '/images/modern-structure.jpg',
    variants: standardVariants,
  },
  {
    id: '13',
    title: 'Spiral Staircase',
    description: 'Looking down a spiral staircase, where geometry meets artistry. This architectural marvel creates visual interest and draws the eye inward.',
    collection: 'Architectural',
    image: '/images/spiral-staircase.jpg',
    variants: standardVariants,
  },
  {
    id: '14',
    title: 'Roman Columns',
    description: 'Ancient Roman columns bathed in soft morning light. A tribute to classical architecture that brings historical elegance to modern spaces.',
    collection: 'Architectural',
    image: '/images/roman-columns.jpg',
    variants: standardVariants,
  },
  {
    id: '15',
    title: 'Mediterranean Door',
    description: 'A weathered blue door set in white walls, evoking memories of coastal villages. Simple yet evocative, this piece tells a story.',
    collection: 'Architectural',
    image: '/images/mediterranean-door.jpg',
    variants: standardVariants,
  },
  {
    id: '28',
    title: 'Greek Dome',
    description: 'Iconic blue dome against the Santorini sky. A minimalist capture of Greek island architecture at its finest.',
    collection: 'Architectural',
    image: '/images/greek-dome.jpg',
    variants: standardVariants,
  },
  {
    id: '29',
    title: 'Geometric Windows',
    description: 'Modernist building facade with striking geometric window patterns. A study in repetition and architectural rhythm.',
    collection: 'Architectural',
    image: '/images/geometric-windows.jpg',
    variants: standardVariants,
  },

  // Fine Art Lines Collection
  {
    id: '3',
    title: 'Classical Silhouette',
    description: 'Elegant line art inspired by classical Greek sculpture. A single continuous line creates a timeless portrait that speaks to both history and modern minimalism.',
    collection: 'Fine Art Lines',
    image: '/images/peaceful-face.jpg',
    variants: standardVariants,
  },
  {
    id: '7',
    title: 'Female Profile',
    description: 'A single continuous line captures the elegance of the feminine form. Sophisticated minimalism that adds artistic depth to your space.',
    collection: 'Fine Art Lines',
    image: '/images/female-profile.jpg',
    variants: standardVariants,
  },
  {
    id: '11',
    title: 'Hands Study',
    description: 'Graceful hands holding a delicate flower, rendered in a single continuous line. An elegant piece that celebrates beauty in simplicity.',
    collection: 'Fine Art Lines',
    image: '/images/hands-study.jpg',
    variants: standardVariants,
  },
  {
    id: '16',
    title: 'Dancing Figure',
    description: 'An abstract figure in motion, captured in flowing continuous lines. This piece brings movement and grace to your walls.',
    collection: 'Fine Art Lines',
    image: '/images/dancing-figure.jpg',
    variants: standardVariants,
  },
  {
    id: '17',
    title: 'Intertwined Leaves',
    description: 'Two olive branches elegantly intertwined in a single flowing line. A symbol of peace and natural beauty for your home.',
    collection: 'Fine Art Lines',
    image: '/images/intertwined-leaves.jpg',
    variants: standardVariants,
  },
  {
    id: '18',
    title: 'Vase Silhouette',
    description: 'An elegant ceramic vase rendered through minimalist line art. Where classical form meets modern simplicity.',
    collection: 'Fine Art Lines',
    image: '/images/vase-silhouette.jpg',
    variants: standardVariants,
  },

  // Neutral Abstract Collection
  {
    id: '2',
    title: 'Abstract Form I',
    description: 'Soft organic shapes in calming neutral tones. This abstract piece brings warmth and sophistication to any space with its gentle curves and earthy palette.',
    collection: 'Neutral Abstract',
    image: '/images/abstract-form.jpg',
    variants: standardVariants,
  },
  {
    id: '6',
    title: 'Organic Forms',
    description: 'Flowing abstract shapes in warm earth tones. This piece creates a sense of calm and natural beauty in any modern interior.',
    collection: 'Neutral Abstract',
    image: '/images/organic-forms.jpg',
    variants: standardVariants,
  },
  {
    id: '10',
    title: 'Soft Gradient',
    description: 'Gentle color transitions in warm neutral tones. This abstract piece creates depth and atmosphere without overwhelming your space.',
    collection: 'Neutral Abstract',
    image: '/images/soft-gradient.jpg',
    variants: standardVariants,
  },
  {
    id: '19',
    title: 'Earth Tones',
    description: 'Abstract brushstrokes in warm terracotta and sand. This piece brings the colors of nature indoors with artistic expression.',
    collection: 'Neutral Abstract',
    image: '/images/earth-tones.jpg',
    variants: standardVariants,
  },
  {
    id: '20',
    title: 'Textured Forms',
    description: 'Organic shapes with rich texture in cream and olive tones. A tactile-looking piece that adds depth and sophistication.',
    collection: 'Neutral Abstract',
    image: '/images/textured-forms.jpg',
    variants: standardVariants,
  },
  {
    id: '30',
    title: 'Geometric Soft',
    description: 'Soft geometric shapes in dusty pink and beige. Overlapping circles and curves create a meditative composition.',
    collection: 'Neutral Abstract',
    image: '/images/geometric-soft.jpg',
    variants: standardVariants,
  },
  {
    id: '31',
    title: 'Gestural Marks',
    description: 'Expressive brushstrokes in warm neutrals. Gestural marks that bring artistic energy to your walls.',
    collection: 'Neutral Abstract',
    image: '/images/gestural-marks.jpg',
    variants: standardVariants,
  },
  {
    id: '32',
    title: 'Abstract Landscape',
    description: 'Soft hills rendered in earth tones. A minimalist interpretation of landscape that brings serenity to any space.',
    collection: 'Neutral Abstract',
    image: '/images/abstract-landscape.jpg',
    variants: standardVariants,
  },

  // Photography Collection
  {
    id: '4',
    title: 'Desert Dunes',
    description: 'Striking black and white photography capturing the endless curves of desert dunes. The play of light and shadow creates a mesmerizing visual experience.',
    collection: 'Photography',
    image: '/images/desert-dunes.jpg',
    variants: photographyVariants,
  },
  {
    id: '8',
    title: 'Ocean Waves',
    description: 'Long-exposure capture of ocean waves in ethereal black and white. The motion of water frozen in time, creating a meditative atmosphere.',
    collection: 'Photography',
    image: '/images/ocean-waves.jpg',
    variants: photographyVariants,
  },
  {
    id: '12',
    title: 'Palm Shadow',
    description: 'Dramatic palm leaf shadows in striking black and white. A botanical piece that brings the tropics indoors with sophisticated restraint.',
    collection: 'Photography',
    image: '/images/palm-shadow.jpg',
    variants: photographyVariants,
  },
  {
    id: '21',
    title: 'Misty Mountains',
    description: 'Layered mountain peaks disappearing into morning mist. A serene landscape that creates depth and tranquility in any space.',
    collection: 'Photography',
    image: '/images/misty-mountains.jpg',
    variants: photographyVariants,
  },
  {
    id: '23',
    title: 'Eucalyptus',
    description: 'Soft sage green eucalyptus branches in gentle natural light. A botanical piece that brings freshness and calm to your home.',
    collection: 'Photography',
    image: '/images/eucalyptus.jpg',
    variants: photographyVariants,
  },
  {
    id: '33',
    title: 'Dried Flower',
    description: 'Minimalist dried flower stem in elegant black and white. Simple botanical beauty with soft shadows.',
    collection: 'Photography',
    image: '/images/dried-flower.jpg',
    variants: photographyVariants,
  },
  {
    id: '34',
    title: 'Water Ripples',
    description: 'Abstract water ripples captured in black and white. A zen-inspired piece that brings calm and contemplation.',
    collection: 'Photography',
    image: '/images/water-ripples.jpg',
    variants: photographyVariants,
  },
  {
    id: '35',
    title: 'Pampas Grass',
    description: 'Dried pampas grass in soft neutral tones. A bohemian botanical that adds warmth and texture to any room.',
    collection: 'Photography',
    image: '/images/pampas-grass.jpg',
    variants: photographyVariants,
  },

  // Typography Collection
  {
    id: '24',
    title: 'Home',
    description: 'Simple yet powerful, this typographic print celebrates the feeling of home. Clean lines and timeless design for minimalist spaces.',
    collection: 'Typography',
    image: '/images/typography-home.jpg',
    variants: typographyVariants,
  },
  {
    id: '25',
    title: 'Less is More',
    description: 'A reminder that simplicity is the ultimate sophistication. This minimal typographic piece embodies the philosophy of thoughtful design.',
    collection: 'Typography',
    image: '/images/typography-less-is-more.jpg',
    variants: typographyVariants,
  },
  {
    id: '26',
    title: 'Breathe',
    description: 'A gentle reminder to pause and be present. This calming typographic piece brings mindfulness into your daily environment.',
    collection: 'Typography',
    image: '/images/typography-breathe.jpg',
    variants: typographyVariants,
  },
  {
    id: '27',
    title: 'Be Still',
    description: 'Finding peace in stillness. This typographic print encourages moments of quiet reflection in your home.',
    collection: 'Typography',
    image: '/images/typography-be-still.jpg',
    variants: typographyVariants,
  },
];

export const collections = [
  'All',
  'Architectural',
  'Fine Art Lines',
  'Neutral Abstract',
  'Photography',
  'Typography',
] as const;

export type CollectionName = (typeof collections)[number];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCollection(collection: string): Product[] {
  if (collection === 'All') return products;
  return products.filter((p) => p.collection === collection);
}

export function getLowestPrice(product: Product): number {
  return Math.min(...product.variants.map((v) => v.price));
}

// Collection data for collection pages
export const collectionsData: Record<string, { name: string; description: string; slug: string }> = {
  'architectural': {
    name: 'Architectural',
    description: 'Clean lines, striking shadows, and timeless structures. Our architectural collection captures the beauty of minimalist design from around the world.',
    slug: 'architectural',
  },
  'fine-art-lines': {
    name: 'Fine Art Lines',
    description: 'Elegant line art inspired by classical sculpture and the human form. Each piece tells a story through a single continuous line.',
    slug: 'fine-art-lines',
  },
  'neutral-abstract': {
    name: 'Neutral Abstract',
    description: 'Soft organic shapes in earthy, calming tones. Perfect for creating a serene, sophisticated atmosphere.',
    slug: 'neutral-abstract',
  },
  'photography': {
    name: 'Photography',
    description: 'Striking black and white captures of nature and architecture. Each photograph is selected for its timeless appeal.',
    slug: 'photography',
  },
  'typography': {
    name: 'Typography',
    description: 'Minimalist words and statements that speak to the soul. Simple, elegant, and meaningful.',
    slug: 'typography',
  },
};

export function getCollectionSlug(collectionName: string): string {
  return collectionName.toLowerCase().replace(/\s+/g, '-');
}
