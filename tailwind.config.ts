import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        safety: { red: "#E53935", "red-light": "#FFEBEE" },
        location: { blue: "#42A5F5", "blue-light": "#E3F2FD" },
        safe: { green: "#66BB6A", "green-light": "#E8F5E9" },
        warn: { orange: "#FFA726", "orange-light": "#FFF3E0" },
        surface: "#FAFBFC",
        muted: "#6B7280",
      },
      borderRadius: { xl: "1rem", "2xl": "1.25rem" },
    },
  },
  plugins: [],
};
export default config;
