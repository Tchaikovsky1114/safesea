/** @type {import('tailwindcss').Config} */
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
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
  variants: {
    scrollbar: ['rounded']
}
}
