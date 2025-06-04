/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  darkMode: 'class', // enables class-based dark mode
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',
        secondary: '#9333EA',
        accent: '#14B8A6',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}
