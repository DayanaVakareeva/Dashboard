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
        'brand-orange': '#FF6900',
      },
      fontFamily: {
        'rubik': ['Rubik', 'sans-serif']
      }
    },
  },
  plugins: [],
}
