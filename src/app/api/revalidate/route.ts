import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

// Map Sanity document types to cache tags
const typeTagMap: Record<string, string[]> = {
  gown: ['gown'],
  designer: ['designer', 'gown'],
  galleryImage: ['gallery'],
  realBride: ['realBride'],
  blogPost: ['blogPost'],
  testimonial: ['testimonial'],
  teamMember: ['teamMember'],
};

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const documentType = body._type as string;
    const tags = typeTagMap[documentType] ?? [];

    for (const tag of tags) {
      revalidateTag(tag);
    }

    return NextResponse.json({ revalidated: true, tags });
  } catch {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
  }
}
