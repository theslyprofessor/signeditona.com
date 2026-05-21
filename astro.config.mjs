import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import node from '@astrojs/node'

// Standalone artist portfolio. SSR via Node adapter so we can fetch
// Convex prod data on every request (low traffic, copy-paste-cheap).
// Switch to `output: 'static'` for build-time fetch when traffic warrants.
export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  integrations: [tailwind({ applyBaseStyles: true })],
  server: {
    host: '0.0.0.0',
    port: 4330,
  },
  site: 'https://signeditona.com',
})
