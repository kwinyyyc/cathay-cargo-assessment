/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        cathaycargo: {
          primary: "#F7F6F1",
          "primary-focus": "#006B6E",
          "primary-content": "#639291",
          secondary: "#E31E24",
          "secondary-focus": "#C41A1F",
          "secondary-content": "#FFFFFF",
          accent: "#0066CC",
          "accent-focus": "#0052A3",
          "accent-content": "#FFFFFF",
          neutral: "#1F2937",
          "neutral-focus": "#111827",
          "neutral-content": "#FFFFFF",
          "base-100": "#FFFFFF",
          "base-200": "#F3F4F6",
          "base-300": "#E5E7EB",
          "base-content": "#1F2937",
          info: "#0066CC",
          success: "#10B981",
          warning: "#F59E0B",
          error: "#E31E24",
        },
      },
    ],
  },
};
