/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'garage-dark': '#0a0a0a',
        'garage-light': '#1a1a1a',
        'window-glow': '#2a2a2a',
      },
    },
  },
  plugins: [],
} 