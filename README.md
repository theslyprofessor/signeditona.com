# signeditona.com

Public portfolio for Signe Ditona. Astro 5 + Node SSR + TailwindCSS, reading from the Midimaze Convex deployment (`amiable-moose-236`).

## Local dev
```bash
bun install
bun run dev   # http://localhost:4330
```

Mobile preview on the same wifi: `http://<your-LAN-ip>:4330`.

## CMS

Content (artist row + works) lives in Convex prod. Until the in-site editor lands, edits happen at:

  https://midimaze.com/signe/admin   (or localhost equivalent)

The site re-fetches on every SSR pageload, so CMS updates surface on the next browser refresh.

## Deploy

Dokploy builds from `docker-compose.prod.yml` on push to `main`.
Temporary subdomain: https://signe.midimaze.com (until signeditona.com is purchased).
