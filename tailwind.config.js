/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F7F4EC",
        ink: "#16302C",
        teal: {
          DEFAULT: "#1F5C55",
          dark: "#123832",
          light: "#EAF1EE",
        },
        amber: {
          DEFAULT: "#C1893D",
          dark: "#9C6C2C",
        },
        sage: {
          DEFAULT: "#7FA98E",
          light: "#DCE8E0",
        },
        line: "#DCD5C3",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-work-sans)", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
