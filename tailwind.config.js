const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#47A248',
          dark: '#3B8A3C'
        },
        secondary: {
          DEFAULT: '#FFFFFF',
          dark: '#1C1C1C'
        },
        accent: {
          DEFAULT: '#FFCD00',
          dark: '#E6B800'
        },
        background: {
          DEFAULT: '#FFFFFF',
          dark: '#121212'
        },
        text: {
          DEFAULT: '#1C1C1C',
          dark: '#E0E0E0'
        },
        card: {
          DEFAULT: '#FFFFFF',
          dark: '#1E1E1E'
        },
        border: {
          DEFAULT: '#E5E7EB',
          dark: '#2D2D2D'
        }
      },
    },
  },
  plugins: [addVariablesForColors],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}