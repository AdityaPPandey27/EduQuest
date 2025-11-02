/** @type {import('tailwindcss').Config} */
export default {
  // 3. Enable dark mode based on the 'dark' class applied to the root element (html tag)
  darkMode: 'class', 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        // Custom color palette for theme consistency
        'primary-blue': '#1D4ED8',
        'secondary-blue': '#3B82F6',
        'dark-bg': '#121212', // Near-black for dark background
        'dark-card': '#1E1E1E', // Darker card contrast
        'light-bg': '#F3F4F6', // Light gray background
        'light-card': '#FFFFFF', // White cards
        'xp-start': '#34D399', // Emerald-400 (Green for XP)
        'xp-end': '#10B981',   // Emerald-500
      },
    },
  },
  plugins: [],
}