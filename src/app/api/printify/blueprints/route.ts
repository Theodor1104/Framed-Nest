import { NextResponse } from 'next/server';
import { getBlueprints } from '@/lib/printify';

/**
 * GET /api/printify/blueprints - Get available product blueprints (posters, prints, etc.)
 */
export async function GET() {
  try {
    const blueprints = await getBlueprints();

    // Filter for poster/print related blueprints
    const posterBlueprints = blueprints.filter(bp =>
      bp.title.toLowerCase().includes('poster') ||
      bp.title.toLowerCase().includes('print') ||
      bp.title.toLowerCase().includes('canvas') ||
      bp.title.toLowerCase().includes('art')
    );

    return NextResponse.json({
      total: blueprints.length,
      posterRelated: posterBlueprints.length,
      blueprints: posterBlueprints.map(bp => ({
        id: bp.id,
        title: bp.title,
        description: bp.description,
        brand: bp.brand,
        images: bp.images,
      })),
    });
  } catch (error) {
    console.error('Error fetching blueprints:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch blueprints' },
      { status: 500 }
    );
  }
}
