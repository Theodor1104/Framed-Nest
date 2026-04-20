import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/printify';

export async function GET() {
  try {
    const shopId = process.env.PRINTIFY_SHOP_ID;

    if (!shopId) {
      // Return mock data if no shop ID is configured
      return NextResponse.json({
        data: getMockProducts(),
      });
    }

    const products = await getProducts(shopId);
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);

    // Return mock data on error for development
    return NextResponse.json({
      data: getMockProducts(),
    });
  }
}

// Mock products for development
function getMockProducts() {
  return [
    {
      id: '1',
      title: 'Santorini Steps',
      description: 'Minimalist architectural print featuring iconic white stairs of Santorini.',
      tags: ['architectural', 'minimalist', 'black-white'],
      images: [{ src: '/placeholder.jpg', variant_ids: [1], position: 'front', is_default: true }],
      variants: [
        { id: 1, title: '21x30cm', price: 14900, is_enabled: true, is_available: true },
        { id: 2, title: '30x40cm', price: 19900, is_enabled: true, is_available: true },
        { id: 3, title: '50x70cm', price: 29900, is_enabled: true, is_available: true },
        { id: 4, title: '70x100cm', price: 44900, is_enabled: true, is_available: true },
      ],
      visible: true,
      collection: 'architectural',
    },
    {
      id: '2',
      title: 'Abstract Form I',
      description: 'Soft organic shapes in calming neutral tones.',
      tags: ['abstract', 'neutral', 'modern'],
      images: [{ src: '/placeholder.jpg', variant_ids: [1], position: 'front', is_default: true }],
      variants: [
        { id: 1, title: '21x30cm', price: 14900, is_enabled: true, is_available: true },
        { id: 2, title: '30x40cm', price: 19900, is_enabled: true, is_available: true },
        { id: 3, title: '50x70cm', price: 24900, is_enabled: true, is_available: true },
      ],
      visible: true,
      collection: 'neutral-abstract',
    },
    {
      id: '3',
      title: 'Classical Silhouette',
      description: 'Elegant line art inspired by classical Greek sculpture.',
      tags: ['line-art', 'classical', 'elegant'],
      images: [{ src: '/placeholder.jpg', variant_ids: [1], position: 'front', is_default: true }],
      variants: [
        { id: 1, title: '21x30cm', price: 14900, is_enabled: true, is_available: true },
        { id: 2, title: '30x40cm', price: 19900, is_enabled: true, is_available: true },
        { id: 3, title: '50x70cm', price: 29900, is_enabled: true, is_available: true },
      ],
      visible: true,
      collection: 'fine-art-lines',
    },
    {
      id: '4',
      title: 'Desert Dunes',
      description: 'Striking black and white photography of desert landscape.',
      tags: ['photography', 'nature', 'black-white'],
      images: [{ src: '/placeholder.jpg', variant_ids: [1], position: 'front', is_default: true }],
      variants: [
        { id: 1, title: '30x40cm', price: 24900, is_enabled: true, is_available: true },
        { id: 2, title: '50x70cm', price: 34900, is_enabled: true, is_available: true },
        { id: 3, title: '70x100cm', price: 49900, is_enabled: true, is_available: true },
      ],
      visible: true,
      collection: 'photography',
    },
    {
      id: '5',
      title: 'Grecian Arches',
      description: 'Architectural beauty captured in minimalist form.',
      tags: ['architectural', 'minimalist', 'mediterranean'],
      images: [{ src: '/placeholder.jpg', variant_ids: [1], position: 'front', is_default: true }],
      variants: [
        { id: 1, title: '21x30cm', price: 14900, is_enabled: true, is_available: true },
        { id: 2, title: '30x40cm', price: 19900, is_enabled: true, is_available: true },
        { id: 3, title: '50x70cm', price: 29900, is_enabled: true, is_available: true },
      ],
      visible: true,
      collection: 'architectural',
    },
    {
      id: '6',
      title: 'Organic Flow',
      description: 'Abstract brushstrokes in warm earthy tones.',
      tags: ['abstract', 'neutral', 'organic'],
      images: [{ src: '/placeholder.jpg', variant_ids: [1], position: 'front', is_default: true }],
      variants: [
        { id: 1, title: '21x30cm', price: 14900, is_enabled: true, is_available: true },
        { id: 2, title: '30x40cm', price: 19900, is_enabled: true, is_available: true },
        { id: 3, title: '50x70cm', price: 24900, is_enabled: true, is_available: true },
      ],
      visible: true,
      collection: 'neutral-abstract',
    },
    {
      id: '7',
      title: 'Female Profile',
      description: 'Elegant single-line portrait in minimalist style.',
      tags: ['line-art', 'portrait', 'minimalist'],
      images: [{ src: '/placeholder.jpg', variant_ids: [1], position: 'front', is_default: true }],
      variants: [
        { id: 1, title: '21x30cm', price: 14900, is_enabled: true, is_available: true },
        { id: 2, title: '30x40cm', price: 19900, is_enabled: true, is_available: true },
        { id: 3, title: '50x70cm', price: 27900, is_enabled: true, is_available: true },
      ],
      visible: true,
      collection: 'fine-art-lines',
    },
    {
      id: '8',
      title: 'Coastal Mist',
      description: 'Serene ocean photography in soft monochrome.',
      tags: ['photography', 'ocean', 'serene'],
      images: [{ src: '/placeholder.jpg', variant_ids: [1], position: 'front', is_default: true }],
      variants: [
        { id: 1, title: '30x40cm', price: 24900, is_enabled: true, is_available: true },
        { id: 2, title: '50x70cm', price: 32900, is_enabled: true, is_available: true },
        { id: 3, title: '70x100cm', price: 44900, is_enabled: true, is_available: true },
      ],
      visible: true,
      collection: 'photography',
    },
  ];
}
