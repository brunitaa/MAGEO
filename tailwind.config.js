/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      transitionProperty: {
        width: "width",
      },
      colors: {
        univalleColorOne: "#9E0044",
         univalleColorTwo: "#5A0027",
      },
    },
  },
  plugins: [],
};
