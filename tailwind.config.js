const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

function token(name) {
  return `rgb(var(--c-${name}) / <alpha-value>)`;
}

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
      fontFamily: {
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
      },
      // Every colour resolves through a CSS variable defined in globals.css,
      // so the `.dark` class flips the whole site. The `dark` keys point at the
      // same variables on purpose: older pages write `dark:bg-background-dark`
      // and keep working without an edit.
      colors: {
        primary: { DEFAULT: token("accent"), dark: token("accent-strong") },
        secondary: { DEFAULT: token("surface"), dark: token("surface") },
        accent: { DEFAULT: token("ink"), dark: token("ink-soft") },
        background: { DEFAULT: token("bg"), dark: token("bg") },
        text: { DEFAULT: token("ink"), dark: token("ink") },
        muted: { DEFAULT: token("muted"), dark: token("muted") },
        card: { DEFAULT: token("surface"), dark: token("surface") },
        border: { DEFAULT: token("line"), dark: token("line") },
        "on-accent": token("on-accent"),
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