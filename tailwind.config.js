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
          default: '#800020'
        },
        'csc-organge': {
          default: '#D6995D'
        },
        'csc-yellow': {
          default: '#ECD68F'
        }
      }
    },
  },
  plugins: [
    require('tailwindcss-animated'),
    (process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
  ],
}

