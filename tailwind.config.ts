/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // REI Bridal brand palette — derived from logo
        charcoal: {
          DEFAULT: '#3d3d3f',
          light: '#4e4e50',
          dark: '#2a2a2c',
          deep: '#1a1a1c',
        },
        champagne: {
          DEFAULT: '#c9b882',
          light: '#ddd0a8',
          dark: '#a89660',
          pale: '#f0e8d0',
        },
        ivory: {
          DEFAULT: '#faf7f2',
          warm: '#f5f0e8',
          deep: '#ede5d8',
        },
        blush: '#f2e4de',
        sage: '#b8c4b1',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-jost)', 'system-ui', 'sans-serif'],
        display: ['var(--font-cormorant)', 'serif'],
      },
      fontSize: {
        '7xl': ['4.5rem', { lineHeight: '1.05' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '0.95' }],
        '10xl': ['10rem', { lineHeight: '0.9' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },
      letterSpacing: {
        'widest-xl': '0.3em',
        'widest-2xl': '0.5em',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease forwards',
        'fade-in': 'fadeIn 1s ease forwards',
        'slide-in-left': 'slideInLeft 0.8s ease forwards',
        'shimmer': 'shimmer 2s infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'gradient-champagne': 'linear-gradient(135deg, #c9b882 0%, #ddd0a8 50%, #c9b882 100%)',
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
      },
      maxWidth: {
        '8xl': '90rem',
        '9xl': '100rem',
      },
      aspectRatio: {
        'portrait': '3 / 4',
        'bridal': '2 / 3',
      },
    },
  },
  plugins: [],
};
