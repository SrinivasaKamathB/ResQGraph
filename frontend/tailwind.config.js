/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkbg: "#0B0F17",
        panelbg: "#111827",
        borderdark: "#1F2937",
        primarycyan: "#06b6d4",
        alertred: "#ef4444",
        warningamber: "#f59e0b",
        successgreen: "#10b981",
      },
    },
  },
  plugins: [],
}
