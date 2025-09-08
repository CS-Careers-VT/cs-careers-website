/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Outfit', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        'csc-maroon': {
          DEFAULT: '#800020',
          bg: '#861F41'
        },
        'csc-organge': {
          DEFAULT: '#D6995D',
          bg: '#d6995d'
        },
        'csc-yellow': {
          DEFAULT: '#ECD68F',
          light: '#F5E9B8'
        }
      }
    },
  },
  plugins: [
    require('tailwindcss-animated'),
    (process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
  ],
}

