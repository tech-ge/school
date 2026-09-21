import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#05060a',
          soft: '#0a0c14',
          card: '#0f121c',
          border: '#1c2030',
        },
        gold: {
          DEFAULT: '#d4af37',
          light: '#f5d97a',
          dark: '#8b6f1f',
        },
        accent: {
          DEFAULT: '#6366f1',
          soft: '#818cf8',
          glow: '#a5b4fc',
        },
        muted: '#8b92a8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #f5d97a 0%, #d4af37 50%, #8b6f1f 100%)',
        'dark-radial': 'radial-gradient(ellipse at top, #1a1f2e 0%, #05060a 70%)',
        'glass': 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))',
      },
      boxShadow: {
        gold: '0 0 40px rgba(212,175,55,0.25)',
        glass: '0 8px 32px rgba(0,0,0,0.4)',
        glow: '0 0 60px rgba(99,102,241,0.35)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'shimmer': 'shimmer 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;