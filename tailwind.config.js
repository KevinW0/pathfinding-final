/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        '70': 'repeat(70, minmax(0, 1fr))',
      },
      padding: {
        'neg': '-2px'
      }
    },
  },
  plugins: [],
}

