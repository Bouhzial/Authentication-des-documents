/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-gray": "#F4F4F4",
        "link-gray": "#D9D9D9",
        "link-text-blue": "#09234F",
        "link-text-gray": "#5D7285",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
