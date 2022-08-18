/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    './index.html',
    './pages/**/*.{html,js}',
    './src/**/*.{js,ts,tsx,jsx}',
  ],
  theme: {
    extend: {
      animation : {
        blink: 'blink 0.5s infinite',
        shimmer: 'shimmer 2s infinite'
      },
      keyframes: {
        blink : {
          '0%' : {opacity: 0}
        },
        shimmer: {
          "100%" : {
            "transform": "translateX(100%)"
          }
        }
      },
      container: {
        center: true,
      }
    },
    screens: {
      'xs' : '444px',
      ...defaultTheme.screens
    }
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
  variants: {
    scrollbar: ['rounded']
}
}
