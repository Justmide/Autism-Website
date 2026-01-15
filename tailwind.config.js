/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ], 
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#F7F8F6',
          navy: '#1F2A44',
          sage: '#6FAF9E',
          gold: '#D6B25E',
          white: '#FFFFFF'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        heading: ['"Outfit"', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(31, 42, 68, 0.05)',
        'card': '0 10px 30px -5px rgba(31, 42, 68, 0.08)',
      }
    },
  },
  plugins: [],
}