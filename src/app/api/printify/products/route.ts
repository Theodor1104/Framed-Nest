import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/printify';

/**
 * GET /api/printify/products - Get all products from Printify shop
 */
export async function GET() {
  try {
    const shopId = process.env.PRINTIFY_SHOP_ID;

    if (!shopId || shopId === 'your_shop_id_here') {
      return NextResponse.json({
        error: 'PRINTIFY_SHOP_ID not configured',
        message: 'Add your Printify shop ID to .env.local',
      }, { status: 400 });
    }

    const { data: products } = await getProducts(shopId);

    return NextResponse.json({
      shopId,
      count: products.length,
      products: products.map(p => ({
        id: p.id,
        title: p.title,
        description: p.description,
        visible: p.visible,
        blueprintId: p.blueprint_id,
        variants: p.variants.map(v => ({
          id: v.id,
          title: v.title,
          price: v.price,
          cost: v.cost,
          isEnabled: v.is_enabled,
          isAvailable: v.is_available,
        })),
        images: p.images.map(img => ({
          src: img.src,
          isDefault: img.is_default,
        })),
      })),
    });
  } catch (error) {
    console.error('Error fetching Printify products:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
