import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-inter), sans-serif", { fontFeatureSettings: '"cv11"' }],
      },
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms")({
      // Generate classes using form-* which stops this plugin from override the styles in Keystatic Admin UI
      // Reference: https://github.com/Thinkmill/keystatic/issues/812
      strategy: "class",
    }),
    require("@tailwindcss/typography"),
  ],
} satisfies Config;
