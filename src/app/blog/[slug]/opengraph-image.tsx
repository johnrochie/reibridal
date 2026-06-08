import { ImageResponse } from 'next/og';
import { getBlogPost } from '@/lib/blog';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

interface Props {
  params: { slug: string };
}

export default function Image({ params }: Props) {
  const post = getBlogPost(params.slug);
  const title = post?.title ?? 'The REI Bridal Journal';
  const category = post
    ? ({ advice: 'Bridal Advice', designers: 'Our Designers', inspiration: 'Inspiration', appointments: 'Appointments' }[post.category] ?? '')
    : '';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          backgroundColor: '#1a1a1c',
          padding: 64,
          position: 'relative',
        }}
      >
        {/* Subtle glow top-right */}
        <div
          style={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(201,184,130,0.12) 0%, transparent 70%)',
          }}
        />

        {/* Top brand bar */}
        <div
          style={{
            position: 'absolute',
            top: 48,
            left: 64,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <span
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 28,
              letterSpacing: '0.2em',
              color: '#c9b882',
            }}
          >
            REI
          </span>
          <span
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 10,
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: '#c9b882',
              opacity: 0.6,
            }}
          >
            Bridal
          </span>
          <div style={{ width: 1, height: 20, backgroundColor: '#c9b882', opacity: 0.3, marginLeft: 8 }} />
          <span
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 10,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#c9b882',
              opacity: 0.4,
            }}
          >
            The Journal
          </span>
        </div>

        {/* Category label */}
        {category && (
          <span
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 11,
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: '#c9b882',
              marginBottom: 20,
            }}
          >
            {category}
          </span>
        )}

        {/* Title */}
        <h1
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: title.length > 50 ? 44 : 56,
            color: '#faf7f2',
            lineHeight: 1.1,
            margin: 0,
            maxWidth: 900,
          }}
        >
          {title}
        </h1>

        {/* Bottom line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 32 }}>
          <div style={{ width: 40, height: 1, backgroundColor: '#c9b882', opacity: 0.5 }} />
          <span
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 11,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#faf7f2',
              opacity: 0.3,
            }}
          >
            reibridal.ie
          </span>
        </div>
      </div>
    ),
    size,
  );
}
