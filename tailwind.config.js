/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7856ff",
      },
    },
    fontSize: {
      "2xsm": "10px",
      xsm: "12px",
      sm: "14px",
      reg: "16px",
      lg: "18px",
      "2xl": "22px",
      "3xl": "28px",
      "4xl": "34px",
    },
  },
  plugins: [],
};
