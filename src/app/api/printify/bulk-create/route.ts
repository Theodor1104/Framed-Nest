import { NextRequest, NextResponse } from 'next/server';
import { readFile, readdir } from 'fs/promises';
import path from 'path';

const PRINTIFY_API_URL = 'https://api.printify.com/v1';
const BLUEPRINT_ID = 443; // Posters (EU)
const PRINT_PROVIDER_ID = 30; // OPT OnDemand

// Matte variants for vertical posters
const VARIANTS = [
  { id: 62355, title: '21×30cm', price: 14900 },   // A4 - 149 DKK
  { id: 62339, title: '30×42cm', price: 19900 },   // A3 - 199 DKK
  { id: 62343, title: '42×59cm', price: 29900 },   // A2 - 299 DKK
  { id: 62345, title: '59×84cm', price: 44900 },   // A1 - 449 DKK
];

// Product data mapping (filename to product info)
const PRODUCT_DATA: Record<string, { title: string; description: string; collection: string }> = {
  'santorini-steps': {
    title: 'Santorini Steps',
    description: 'Minimalist architectural print featuring the iconic white stairs of Santorini.',
    collection: 'Architectural',
  },
  'grecian-arches': {
    title: 'Grecian Arches',
    description: 'White arched doorways bathed in soft Mediterranean light.',
    collection: 'Architectural',
  },
  'modern-structure': {
    title: 'Modern Structure',
    description: 'Bold brutalist architecture captured in dramatic shadows.',
    collection: 'Architectural',
  },
  'spiral-staircase': {
    title: 'Spiral Staircase',
    description: 'Looking down a spiral staircase, where geometry meets artistry.',
    collection: 'Architectural',
  },
  'roman-columns': {
    title: 'Roman Columns',
    description: 'Ancient Roman columns bathed in soft morning light.',
    collection: 'Architectural',
  },
  'mediterranean-door': {
    title: 'Mediterranean Door',
    description: 'A weathered blue door set in white walls, evoking memories of coastal villages.',
    collection: 'Architectural',
  },
  'greek-dome': {
    title: 'Greek Dome',
    description: 'Iconic blue dome against the Santorini sky.',
    collection: 'Architectural',
  },
  'geometric-windows': {
    title: 'Geometric Windows',
    description: 'Modernist building facade with striking geometric window patterns.',
    collection: 'Architectural',
  },
  'peaceful-face': {
    title: 'Classical Silhouette',
    description: 'Elegant line art inspired by classical Greek sculpture.',
    collection: 'Fine Art Lines',
  },
  'female-profile': {
    title: 'Female Profile',
    description: 'A single continuous line captures the elegance of the feminine form.',
    collection: 'Fine Art Lines',
  },
  'hands-study': {
    title: 'Hands Study',
    description: 'Graceful hands holding a delicate flower, rendered in a single continuous line.',
    collection: 'Fine Art Lines',
  },
  'dancing-figure': {
    title: 'Dancing Figure',
    description: 'An abstract figure in motion, captured in flowing continuous lines.',
    collection: 'Fine Art Lines',
  },
  'intertwined-leaves': {
    title: 'Intertwined Leaves',
    description: 'Two olive branches elegantly intertwined in a single flowing line.',
    collection: 'Fine Art Lines',
  },
  'vase-silhouette': {
    title: 'Vase Silhouette',
    description: 'An elegant ceramic vase rendered through minimalist line art.',
    collection: 'Fine Art Lines',
  },
  'abstract-form': {
    title: 'Abstract Form I',
    description: 'Soft organic shapes in calming neutral tones.',
    collection: 'Neutral Abstract',
  },
  'organic-forms': {
    title: 'Organic Forms',
    description: 'Flowing abstract shapes in warm earth tones.',
    collection: 'Neutral Abstract',
  },
  'soft-gradient': {
    title: 'Soft Gradient',
    description: 'Gentle color transitions in warm neutral tones.',
    collection: 'Neutral Abstract',
  },
  'earth-tones': {
    title: 'Earth Tones',
    description: 'Abstract brushstrokes in warm terracotta and sand.',
    collection: 'Neutral Abstract',
  },
  'textured-forms': {
    title: 'Textured Forms',
    description: 'Organic shapes with rich texture in cream and olive tones.',
    collection: 'Neutral Abstract',
  },
  'geometric-soft': {
    title: 'Geometric Soft',
    description: 'Soft geometric shapes in dusty pink and beige.',
    collection: 'Neutral Abstract',
  },
  'gestural-marks': {
    title: 'Gestural Marks',
    description: 'Expressive brushstrokes in warm neutrals.',
    collection: 'Neutral Abstract',
  },
  'abstract-landscape': {
    title: 'Abstract Landscape',
    description: 'Soft hills rendered in earth tones.',
    collection: 'Neutral Abstract',
  },
  'desert-dunes': {
    title: 'Desert Dunes',
    description: 'Striking black and white photography capturing the endless curves of desert dunes.',
    collection: 'Photography',
  },
  'ocean-waves': {
    title: 'Ocean Waves',
    description: 'Long-exposure capture of ocean waves in ethereal black and white.',
    collection: 'Photography',
  },
  'palm-shadow': {
    title: 'Palm Shadow',
    description: 'Dramatic palm leaf shadows in striking black and white.',
    collection: 'Photography',
  },
  'misty-mountains': {
    title: 'Misty Mountains',
    description: 'Layered mountain peaks disappearing into morning mist.',
    collection: 'Photography',
  },
  'eucalyptus': {
    title: 'Eucalyptus',
    description: 'Soft sage green eucalyptus branches in gentle natural light.',
    collection: 'Photography',
  },
  'dried-flower': {
    title: 'Dried Flower',
    description: 'Minimalist dried flower stem in elegant black and white.',
    collection: 'Photography',
  },
  'water-ripples': {
    title: 'Water Ripples',
    description: 'Abstract water ripples captured in black and white.',
    collection: 'Photography',
  },
  'pampas-grass': {
    title: 'Pampas Grass',
    description: 'Dried pampas grass in soft neutral tones.',
    collection: 'Photography',
  },
  'typography-home': {
    title: 'Home',
    description: 'Simple yet powerful, this typographic print celebrates the feeling of home.',
    collection: 'Typography',
  },
  'typography-less-is-more': {
    title: 'Less is More',
    description: 'A reminder that simplicity is the ultimate sophistication.',
    collection: 'Typography',
  },
  'typography-breathe': {
    title: 'Breathe',
    description: 'A gentle reminder to pause and be present.',
    collection: 'Typography',
  },
  'typography-be-still': {
    title: 'Be Still',
    description: 'Finding peace in stillness.',
    collection: 'Typography',
  },
};

async function printifyFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = process.env.PRINTIFY_API_TOKEN;
  if (!token) throw new Error('PRINTIFY_API_TOKEN not set');

  const response = await fetch(`${PRINTIFY_API_URL}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Printify API error: ${response.status} - ${error}`);
  }

  return response.json();
}

async function uploadImage(fileName: string, base64: string): Promise<{ id: string }> {
  return printifyFetch('/uploads/images.json', {
    method: 'POST',
    body: JSON.stringify({
      file_name: fileName,
      contents: base64,
    }),
  });
}

async function createProduct(
  shopId: string,
  title: string,
  description: string,
  imageId: string,
  tags: string[]
): Promise<{ id: string }> {
  const productData = {
    title,
    description,
    blueprint_id: BLUEPRINT_ID,
    print_provider_id: PRINT_PROVIDER_ID,
    variants: VARIANTS.map((v) => ({
      id: v.id,
      price: v.price,
      is_enabled: true,
    })),
    print_areas: [
      {
        variant_ids: VARIANTS.map((v) => v.id),
        placeholders: [
          {
            position: 'front',
            images: [
              {
                id: imageId,
                x: 0.5,
                y: 0.5,
                scale: 1,
                angle: 0,
              },
            ],
          },
        ],
      },
    ],
    tags,
  };

  return printifyFetch(`/shops/${shopId}/products.json`, {
    method: 'POST',
    body: JSON.stringify(productData),
  });
}

async function publishProduct(shopId: string, productId: string): Promise<void> {
  await printifyFetch(`/shops/${shopId}/products/${productId}/publish.json`, {
    method: 'POST',
    body: JSON.stringify({
      title: true,
      description: true,
      images: true,
      variants: true,
      tags: true,
    }),
  });
}

export async function POST(request: NextRequest) {
  try {
    const shopId = process.env.PRINTIFY_SHOP_ID;
    if (!shopId) {
      return NextResponse.json({ error: 'PRINTIFY_SHOP_ID not configured' }, { status: 400 });
    }

    const { singleImage } = await request.json().catch(() => ({}));

    // Get images directory
    const imagesDir = path.join(process.cwd(), 'public', 'images');
    const files = await readdir(imagesDir);

    // Filter for artwork images (exclude room images)
    const artworkFiles = files.filter(
      (f) =>
        (f.endsWith('.jpg') || f.endsWith('.png')) &&
        !f.startsWith('room-') &&
        !f.includes('placeholder')
    );

    // If single image specified, only process that one
    const filesToProcess = singleImage
      ? artworkFiles.filter((f) => f.includes(singleImage))
      : artworkFiles;

    const results: { file: string; status: string; productId?: string; error?: string }[] = [];

    for (const file of filesToProcess) {
      const baseName = file.replace(/\.(jpg|png)$/, '');
      const productInfo = PRODUCT_DATA[baseName];

      if (!productInfo) {
        results.push({ file, status: 'skipped', error: 'No product data found' });
        continue;
      }

      try {
        // Read and convert image to base64
        const imagePath = path.join(imagesDir, file);
        const imageBuffer = await readFile(imagePath);
        const base64 = imageBuffer.toString('base64');

        // Upload image to Printify
        console.log(`Uploading ${file}...`);
        const uploadResult = await uploadImage(file, base64);

        // Create product
        console.log(`Creating product: ${productInfo.title}...`);
        const product = await createProduct(
          shopId,
          productInfo.title,
          productInfo.description,
          uploadResult.id,
          [productInfo.collection, 'Art Print', 'Poster', 'Wall Art', 'Home Decor']
        );

        // Publish product
        console.log(`Publishing product: ${productInfo.title}...`);
        await publishProduct(shopId, product.id);

        results.push({
          file,
          status: 'success',
          productId: product.id,
        });

        // Small delay to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (error) {
        console.error(`Error processing ${file}:`, error);
        results.push({
          file,
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    const successCount = results.filter((r) => r.status === 'success').length;
    const errorCount = results.filter((r) => r.status === 'error').length;

    return NextResponse.json({
      message: `Processed ${filesToProcess.length} images`,
      success: successCount,
      errors: errorCount,
      results,
    });
  } catch (error) {
    console.error('Bulk create error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create products' },
      { status: 500 }
    );
  }
}
