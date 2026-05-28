/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Warm Editorial palette: warm light ground, espresso ink,
        // a curated terracotta + ochre. Cute-but-powerful, professional.
        oat: '#F3EDE3',
        oatdeep: '#E9E0D2',
        espresso: '#2B211B',
        terracotta: '#E5604D',
        clay: '#B5503D',
        ochre: '#D9A24B',
      },
      fontFamily: {
        // Charming characterful serif display + clean grotesk body.
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
