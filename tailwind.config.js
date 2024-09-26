/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
    colors: {
      primary: "#0f172a",
      secondary: "#374151",
      success: {
        default: "#16a34a",
        hover: "#22c55e",
        700: "#15803d",
        400: "#4ade80"
      },
      white: "#ffffff",
      black: {
        default: "#000000",
        50: "rgba(0, 0, 0, 0.5)"
      },
      sky: {
        default : "#0284c7",
        500 : "#0ea5e9",
        300: "#7dd3fc"
      },
      danger: {
        default: "#ef4444",
        400: "#f87171",
        600: "#dc2626"
      }
      ,
      warning: {
        default: "#ca8a04",
        hover: "#eab308",
      },
      slate: "#f1f5f9",
      transparent: "transparent",
      gray: {
        50: "#f9fafb",
        300 : "#d1d5db",
        400 : "#9ca3af",
        500 : "#6b7280",
        600 : "#4b5563",
        700: "#374151"
      },
      orange: "#ea580c",
      card: {
        default : "#e2e8f0",
        null: "#fee2e2"
      }
    }
  },
  plugins: [],
};
