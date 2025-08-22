/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'seasons-green': '#4ade80',
        'seasons-orange': '#fb923c',
        'seasons-white': '#ffffff',
      },
    },
  },
  plugins: [],
}
