/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(0 0% 92%)",
        input: "hsl(0 0% 92%)",
        ring: "hsl(142 71% 30%)",
        background: "hsl(0 0% 97%)",
        foreground: "hsl(0 0% 13%)",
        primary: {
          DEFAULT: "hsl(142 71% 30%)",
          foreground: "hsl(0 0% 100%)",
          light: "hsl(142 71% 40%)",
          dark: "hsl(142 71% 20%)",
        },
        secondary: {
          DEFAULT: "hsl(142 20% 90%)",
          foreground: "hsl(0 0% 13%)",
        },
        destructive: {
          DEFAULT: "hsl(0 84% 60%)",
          foreground: "hsl(0 0% 100%)",
        },
        muted: {
          DEFAULT: "hsl(0 0% 95%)",
          foreground: "hsl(0 0% 50%)",
        },
        accent: {
          DEFAULT: "hsl(0 0% 97%)",
          foreground: "hsl(0 0% 13%)",
        },
        card: {
          DEFAULT: "hsl(0 0% 100%)",
          foreground: "hsl(0 0% 13%)",
        },
      },
      borderRadius: {
        lg: "16px",
        md: "12px",
        sm: "8px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
