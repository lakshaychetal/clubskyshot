/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f3f7f2',
          100: '#e6efe4',
          200: '#c7dcc2',
          300: '#9cc29a',
          400: '#6fa877',
          500: '#4f9062',
          600: '#3c7450',
          700: '#2f5c40',
          800: '#264a35',
          900: '#1d3a2a',
          950: '#12251b',
        },
        cream: {
          50: '#fffaf0',
          100: '#f7edd3',
          200: '#ecdfbf',
          300: '#ddca9e',
          400: '#cbb585',
          500: '#b19a6b',
        },
        leaf: {
          50: '#eef7f3',
          100: '#d8efe7',
          200: '#b5dece',
          300: '#82c4b0',
          400: '#57a693',
          500: '#3b8775',
          600: '#2f6c5e',
          700: '#26554a',
          800: '#1f443c',
          900: '#18362f',
        },
        gold: {
          50: '#fff7e6',
          100: '#ffe8b8',
          200: '#fbd67a',
          300: '#edbe44',
          400: '#d6a632',
          500: '#b18823',
          600: '#8d6b1b',
          700: '#735616',
          800: '#5a4412',
          900: '#47360e',
        }
      },
      fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],
  display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
  serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 10px 30px rgba(16, 83, 60, 0.15)'
      },
      backgroundImage: {
  'grid-light': "radial-gradient(rgba(16,61,46,0.08) 1.1px, transparent 1.1px)",
  'grid-dark': "radial-gradient(rgba(255,255,255,0.05) 1.1px, transparent 1.1px)",
      },
      backgroundSize: {
        'grid-16': '16px 16px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: 0, transform: 'translateY(16px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        },
        'pulse-slow': {
          '0%, 100%': { opacity: 0.15 },
          '50%': { opacity: 0.25 }
        },
        'sheen': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        'float-up': {
          '0%': { transform: 'translateY(0)', opacity: 0 },
          '10%': { opacity: 0.4 },
          '90%': { opacity: 0.3 },
          '100%': { transform: 'translateY(-160px)', opacity: 0 }
        },
        'gradient-move': {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-10px) scale(1.02)' }
        },
        'title-pop': {
          '0%': { transform: 'scale(0.98)', letterSpacing: '-0.02em' },
          '100%': { transform: 'scale(1)', letterSpacing: '0' }
        }
      },
      animation: {
        'fade-up': 'fade-up 700ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'pulse-slow': 'pulse-slow 6s ease-in-out infinite',
        'sheen': 'sheen 2.6s linear infinite',
        'float-up': 'float-up var(--dur,6s) ease-in infinite var(--delay,0s)',
        'gradient-move': 'gradient-move 12s ease-in-out infinite',
        'title-pop': 'title-pop 800ms cubic-bezier(0.22, 1, 0.36, 1) both'
      }
    },
  },
  plugins: [],
}
