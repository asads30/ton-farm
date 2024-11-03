/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      geist: "Geist, sans-serif",
      "geist-mono": "GeistMono, sans-serif",
      sf: "SFProText, sans-serif",
      pixeboy: "Pixeboy, sans-serif",
      patsy: "PatsySans, sans-serif",
      poppins: "Poppins, sans-serif",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
