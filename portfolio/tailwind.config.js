/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5cdb95",
        secondary: "#8ee4af",
        secondary1: "#edf5e1",
        secondary2: "#379683",
        secondary3: "#05386b",
      },
    },
    fontFamily: {
      changa: ["Changa", "sans-serif"],
    },
    animation: {
      'spin-slow': 'spin 3s linear infinite',
    }
  },
  plugins: [],
};
