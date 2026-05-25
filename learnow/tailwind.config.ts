import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-space-grotesk)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        textSecondary: "var(--text-secondary)",
        textMuted: "var(--text-muted)",
        
        primary: {
          DEFAULT: "var(--primary)",
          hover: "var(--primary-hover)",
          glow: "var(--primary-glow)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          hover: "var(--secondary-hover)",
        },
        border: {
          DEFAULT: "var(--border)",
          hover: "var(--border-hover)",
        },
        accent: {
          cyan: "var(--accent-cyan)",
          green: "var(--accent-green)",
          danger: "var(--accent-danger)",
          warning: "var(--accent-warning)",
        },
      },
      animation: {
        "pulse-glow": "pulseGlow 2.5s infinite ease-in-out",
        "shimmer": "shimmer 3s infinite linear",
        "flame-pulse": "flamePulse 1.2s infinite alternate ease-in-out",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 12px 0 rgba(99, 91, 255, 0.1)" },
          "50%": { boxShadow: "0 0 24px 0 rgba(99, 91, 255, 0.25)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        flamePulse: {
          "0%": {
            transform: "scale(1) rotate(-1.5deg)",
            filter: "drop-shadow(0 0 3px rgba(255, 179, 71, 0.35))",
          },
          "100%": {
            transform: "scale(1.06) rotate(1.5deg)",
            filter: "drop-shadow(0 0 7px rgba(255, 179, 71, 0.7))",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
