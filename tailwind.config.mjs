/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Indie / Anthropic-flavored: true black ground, warm ivory ink,
        // a single Claude-coral accent. Simple and minimal.
        ink: '#0B0B0B',
        coal: '#161616',
        ivory: '#ECE7DD',
        coral: '#D97757',
        coraldark: '#C2603F',
      },
      fontFamily: {
        // Simple geometric grotesk display + clean body + mono labels.
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
