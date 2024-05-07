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
        'dark-red': '#7B1226',
        'inner-blue': '#161738',
        'button-green': '#2F8024',
        'salmon': '#FA8072',
      },
      fontFamily: {
        'rubik': ['Rubik', 'sans-serif']
      }
    },
  },
  plugins: [],
}
