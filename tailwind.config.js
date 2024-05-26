/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        login: "url('/public/loginBackground.png')",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
  important: "#app",
};
