/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}"],
  theme: {
    extend: {
      colors: {
        // Editorial / Swiss-minimal palette
        canvas: "#faf8f4", // off-white page
        ink: "#1a1a1a", // near-black text
        muted: "#4a463f", // secondary text
        faint: "#8a7f6d", // kickers / captions
        line: "#e4dfd4", // hairline dividers
        accent: {
          DEFAULT: "#b1471f", // terracotta (revisit at build)
          soft: "#c9633b",
        },
      },
      fontFamily: {
        serif: ['"Newsreader"', "Georgia", '"Times New Roman"', "serif"],
        sans: ['"Inter"', "system-ui", "-apple-system", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      letterSpacing: {
        kicker: "0.16em",
      },
      maxWidth: {
        prose: "68ch",
        content: "1120px",
      },
    },
  },
  plugins: [],
};
