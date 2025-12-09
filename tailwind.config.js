/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#667eea",
        secondary: "#764ba2",
      },
      animation: {
        typing: "typing 1.4s infinite",
        "slide-in": "slide-in 0.3s ease-out",
      },
      keyframes: {
        typing: {
          "0%, 60%, 100%": { opacity: "0.5", transform: "translateY(0)" },
          "30%": { opacity: "1", transform: "translateY(-10px)" },
        },
        "slide-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
