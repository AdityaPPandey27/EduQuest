/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    // This line tells Tailwind to scan all JS, JSX, TS, and TSX files in the src/ folder
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}