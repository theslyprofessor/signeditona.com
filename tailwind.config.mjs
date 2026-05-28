/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Barrio Contemporary palette: near-black canvas, off-white ink,
        // heritage-vibrant pops.
        ink: '#0E0E0F',
        bone: '#F7F4EE',
        ember: '#E8493A',
        rosa: '#E0218A',
        marigold: '#F5A623',
        jade: '#1FA87B',
      },
      fontFamily: {
        // Heavy condensed poster display + clean grotesk body.
        display: ['Anton', 'Impact', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
