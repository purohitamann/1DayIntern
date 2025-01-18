/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {
        "sky-blue": "#87CEEB",
        "sunny-yellow": "#FFD700",
        "grass-green": "#228B22",
        "sunset-orange": "#FFA500",
        "pure-white": "#FFFFFF",
        "deep-black": "#000000",
        "dark-primary": "#1a1a2e",
        "dark-secondary": "#16213e",
        "dark-accent": "#0f3460",
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', "cursive"],
        silkscreen: ["Silkscreen", "cursive"],
        pixelify: ['"Pixelify Sans"', "sans-serif"],
      },
      boxShadow: {
        sunny: "0 8px 32px rgba(0,0,0,0.1)",
        "sunny-hover": "0 12px 48px rgba(0,0,0,0.15)",
        button: "0 4px 12px rgba(0,0,0,0.15)",
        "button-hover": "0 8px 24px rgba(0,0,0,0.2)",
        // Removed "pixel-border"
      },
      backgroundImage: {
        "sunny-gradient":
          "linear-gradient(135deg, var(--sky-blue) 0%, var(--white) 100%)",
        "button-gradient":
          "linear-gradient(135deg, var(--yellow), var(--orange))",
        "button-hover-gradient":
          "linear-gradient(135deg, var(--orange), var(--yellow))",
      },
      keyframes: {
        shine: {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        // Removed "pixel-bounce"
      },
      animation: {
        shine: "shine 2s infinite linear",
        float: "float 3s infinite ease-in-out",
        bounce: "bounce 2s infinite",
        // Removed "pixel-bounce"
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
