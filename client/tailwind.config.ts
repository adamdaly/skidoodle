import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Scans App Router files
    "./pages/**/*.{js,ts,jsx,tsx}", // Scans Pages Router files (if used)
    "./components/**/*.{js,ts,jsx,tsx}", // Scans component files
    "./custom/components/**/*.{js,ts,jsx,tsx}", // Scans component files
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1d4ed8", // Custom color example
        secondary: "#9333ea",
      },
      fontFamily: {
        heading: "var(--font-heading)",
        // sans: ["Inter", "sans-serif"], // Custom font example
      },
      spacing: {
        // "128": "32rem", // Custom spacing example
      },
    },
    boxShadow: {
      canvas: "0 0 40px rgba(0, 0, 0, 0.1)",
    },
  },
  plugins: [],
} satisfies Config;
