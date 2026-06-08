import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'REI Bridal — Luxury Bridal Boutique Kerry, Ireland';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1a1a1c',
          position: 'relative',
        }}
      >
        {/* Radial glow */}
        <div
          style={{
            position: 'absolute',
            width: 700,
            height: 700,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(201,184,130,0.15) 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Top line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 40 }}>
          <div style={{ width: 60, height: 1, backgroundColor: '#c9b882', opacity: 0.4 }} />
          <span
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 11,
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: '#c9b882',
              opacity: 0.6,
            }}
          >
            Kerry, Ireland
          </span>
          <div style={{ width: 60, height: 1, backgroundColor: '#c9b882', opacity: 0.4 }} />
        </div>

        {/* Logo */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 32 }}>
          <span
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 96,
              letterSpacing: '0.2em',
              color: '#c9b882',
              lineHeight: 1,
            }}
          >
            REI
          </span>
          <span
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 14,
              letterSpacing: '0.5em',
              textTransform: 'uppercase',
              color: '#c9b882',
              opacity: 0.7,
              marginTop: 8,
            }}
          >
            Bridal
          </span>
        </div>

        {/* Divider */}
        <div style={{ width: 80, height: 1, backgroundColor: '#c9b882', opacity: 0.4, marginBottom: 32 }} />

        {/* Tagline */}
        <span
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 22,
            color: '#faf7f2',
            opacity: 0.5,
            letterSpacing: '0.05em',
            fontStyle: 'italic',
          }}
        >
          Luxury Bridal Boutique · Kerry, Ireland
        </span>
      </div>
    ),
    size,
  );
}
