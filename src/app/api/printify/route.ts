import { NextResponse } from 'next/server';
import { getShops } from '@/lib/printify';

/**
 * GET /api/printify - Test Printify connection and get shops
 */
export async function GET() {
  try {
    const token = process.env.PRINTIFY_API_TOKEN;

    if (!token || token === 'your_printify_api_token_here') {
      return NextResponse.json({
        connected: false,
        error: 'PRINTIFY_API_TOKEN not configured',
        message: 'Add your Printify API token to .env.local',
      });
    }

    const shops = await getShops();

    return NextResponse.json({
      connected: true,
      shops: shops.map(shop => ({
        id: shop.id,
        title: shop.title,
        salesChannel: shop.sales_channel,
      })),
    });
  } catch (error) {
    console.error('Printify connection error:', error);
    return NextResponse.json({
      connected: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
