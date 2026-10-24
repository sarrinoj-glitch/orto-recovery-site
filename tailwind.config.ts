import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-sans)", "system-ui"],
        sans: ["var(--font-sans)", "system-ui"],
        mono: ["var(--font-mono)", "monospace"],
        hand: ["var(--font-hand)", "cursive"],
      },
      colors: {
        // Сайт: палитра брендбука, без декоративных градиентов
        graphite: "#212121",
        teal: { DEFAULT: "#177E96", dark: "#0F5C6E", soft: "#D7ECF0" },
        ward: "#EEF3F4",
        lime: { DEFAULT: "#F2FF59", soft: "#F8FFC9" },
        neon: "#48F6FF",
        lagoon: { DEFAULT: "#DDF8FB", deep: "#9FEAF2" },
        deep: { DEFAULT: "#0B3D4A", 2: "#0E4D5D" },
        coral: { DEFAULT: "#FF8B6B", soft: "#FFE3D9" },
        // Бренд «Орто-Рекавери» (брендбук 2021): рабочий #177E96, неон #48F6FF / #F2FF59 — только акценты
        brand: {
          DEFAULT: "#177E96",
          dark: "#0F5C6E",
          soft: "#2FA9BC",
          bg: "#F2F8F9",
          neon: "#48F6FF",
          lime: "#F2FF59",
          ink: "#212121",
          50: "#E8F6F8",
          100: "#CDECF1",
          600: "#177E96",
          700: "#0F5C6E",
        },
        // Palette adapted from Claude Design — teal-mint-sand premium dental
        mint: {
          50: "#F4FAF8",
          100: "#EAF6F2",
          200: "#C9EAE1",
          300: "#9FD8CB",
          400: "#6BC3B0",
          500: "#2E8B7F",
          600: "#1B5A4E",
          700: "#123F38",
          800: "#0E2F2A",
          900: "#0A201D",
        },
        ink: {
          50: "#F5F8F8",
          100: "#E4ECEE",
          200: "#D8E5E7",
          300: "#B0BFC5",
          400: "#64757F",
          500: "#4D5C66",
          600: "#1E3240",
          700: "#0B1E2B",
          800: "#061018",
          900: "#020607",
        },
        sky: "#DCEDF2",
        sand: "#F4E8D8",
        cream: "#F5F8F8",
      },
      boxShadow: {
        lift: "0 18px 50px -20px rgba(33,33,33,0.35)",
        soft: "0 20px 60px -30px rgba(20,30,48,0.18)",
        ring: "0 30px 80px -30px rgba(34,197,94,0.35)",
        card: "0 10px 40px -20px rgba(20,30,48,0.12)",
      },
      animation: {
        "fade-up": "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards",
        "float-slow": "float 6s ease-in-out infinite",
        "pulse-mint": "pulseMint 3s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        pulseMint: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(34,197,94,0.4)" },
          "50%": { boxShadow: "0 0 0 18px rgba(34,197,94,0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
