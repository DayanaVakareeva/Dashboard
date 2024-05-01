/** @type {import('tailwindcss').Config} */
export default {
  purge: {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
  },
  theme: {
    extend: {
      colors: {
        'dark-blue': '#020024',
        'text-yellow': '#DECE9A',
        'brand-orange': '#FF6900',
      },
      fontFamily: {
        'rubik': ['Rubik', 'sans-serif']
      }
    },
  },
  plugins: [],
}
