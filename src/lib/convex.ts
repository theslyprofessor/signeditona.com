/**
 * Convex prod read client.
 *
 * Public site fetches data via the Midimaze Convex deployment
 * (amiable-moose-236). Signe's portfolio rows live in `portfolioArtists`
 * + `portfolioWorks` and are exposed via the `portfolio:*` functions.
 *
 * No mutations from this site; the CMS lives in midimaze at /signe/admin.
 */
import { ConvexHttpClient } from 'convex/browser'

const CONVEX_URL = 'https://amiable-moose-236.convex.cloud'
export const SIGNE_SLUG = 'signe-ditona'

export interface ArtistLink {
  label: string
  url: string
}

export interface PortfolioArtist {
  _id: string
  slug: string
  displayName: string
  tagline?: string
  bio?: string
  heroImageUrl?: string
  accentColor?: string
  location?: string
  links?: ArtistLink[]
  isPublic: boolean
}

export interface PortfolioWork {
  _id: string
  artistSlug: string
  medium: 'mural' | 'voiceover' | 'song' | 'acting'
  title: string
  subtitle?: string
  description?: string
  location?: string
  year?: number
  imageUrls?: string[]
  audioUrls?: string[]
  videoUrl?: string
  sourceUrl?: string
  collaborators?: string[]
  tags?: string[]
  isFeatured: boolean
  sortOrder?: number
}

let client: ConvexHttpClient | null = null
function getClient() {
  if (!client) client = new ConvexHttpClient(CONVEX_URL)
  return client
}

export async function fetchArtist(): Promise<PortfolioArtist | null> {
  return (await getClient().query('portfolio:getArtistBySlug' as any, {
    slug: SIGNE_SLUG,
  })) as PortfolioArtist | null
}

export async function fetchWorks(): Promise<PortfolioWork[]> {
  return (await getClient().query('portfolio:listPublishedWorks' as any, {
    artistSlug: SIGNE_SLUG,
  })) as PortfolioWork[]
}

export function groupByMedium(works: PortfolioWork[]) {
  return {
    mural: works.filter((w) => w.medium === 'mural'),
    voiceover: works.filter((w) => w.medium === 'voiceover'),
    song: works.filter((w) => w.medium === 'song'),
    acting: works.filter((w) => w.medium === 'acting'),
  }
}
