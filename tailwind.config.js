/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        plum: { DEFAULT: '#5F1040', deep: '#4A0C32', soft: '#7A183F' },
        saffron: { DEFAULT: '#FEBF4A', deep: '#E9A62F' },
        teal: { DEFAULT: '#0F4D5B', muted: '#39727A' },
        ivory: '#FFF8E8',
        cream: '#F8EBD0',
        gold: { DEFAULT: '#C99A3D', light: '#E3C078' },
        burgundy: '#7A183F',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        gujarati: ['"Noto Serif Gujarati"', '"Noto Sans Gujarati"', 'serif'],
      },
      letterSpacing: { brand: '0.32em' },
      boxShadow: {
        card: '0 18px 50px -24px rgba(74, 12, 50, 0.45)',
        lift: '0 30px 70px -30px rgba(74, 12, 50, 0.6)',
        glow: '0 0 60px -10px rgba(254, 191, 74, 0.55)',
      },
      backgroundImage: {
        signature: 'linear-gradient(90deg, #5F1040 0%, #FEBF4A 50%, #0F4D5B 100%)',
        'signature-soft':
          'linear-gradient(135deg, #5F1040 0%, #7A183F 28%, #FEBF4A 55%, #39727A 80%, #0F4D5B 100%)',
        'gold-line': 'linear-gradient(90deg, transparent, #C99A3D, transparent)',
      },
      animation: {
        'gradient-drift': 'gradient-drift 18s ease-in-out infinite',
        float: 'float 7s ease-in-out infinite',
        'float-slow': 'float 11s ease-in-out infinite',
        'diya-glow': 'diya-glow 4.5s ease-in-out infinite',
        'spin-slow': 'spin 60s linear infinite',
        'spin-slower': 'spin 120s linear infinite reverse',
        twinkle: 'twinkle 3.5s ease-in-out infinite',
        'scan-line': 'scan-line 2.4s ease-in-out infinite',
      },
      keyframes: {
        'gradient-drift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(-1.2deg)' },
        },
        'diya-glow': {
          '0%, 100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.08)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.15', transform: 'scale(0.8)' },
          '50%': { opacity: '0.9', transform: 'scale(1)' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
    },
  },
  plugins: [],
};
