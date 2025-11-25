/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        'lux-black': '#080808',
        'lux-charcoal': '#141414',
        'lux-gold': '#D4AF37',
        'lux-gold-dim': '#8A7640',
        'lux-gold-light': '#F8E7B0',
        'lux-white': '#EAEAEA',
        'lux-gray': '#888888',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #F8E7B0 50%, #D4AF37 100%)',
        'subtle-glow': 'radial-gradient(circle at center, rgba(212, 175, 55, 0.08) 0%, rgba(0,0,0,0) 70%)',
      }
    },
  },
  plugins: [],
}