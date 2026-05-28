/**
 * Portfolio public reads for signeditona.com.
 *
 * Reads are unauthenticated for published rows. Write/CMS mutations are
 * intentionally NOT here yet; in-site edit mode (token-gated upload +
 * reorder) lands as a separate, self-contained surface.
 */
import { v } from "convex/values";
import { query } from "./_generated/server";

const portfolioMedium = v.union(
  v.literal("mural"),
  v.literal("voiceover"),
  v.literal("song"),
  v.literal("acting"),
);

export const getArtistBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    const artist = await ctx.db
      .query("portfolioArtists")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();
    if (!artist || !artist.isPublic) return null;
    return artist;
  },
});

export const listPublishedWorks = query({
  args: {
    artistSlug: v.string(),
    medium: v.optional(portfolioMedium),
  },
  handler: async (ctx, { artistSlug, medium }) => {
    const all = await ctx.db
      .query("portfolioWorks")
      .withIndex("by_artistSlug_sortOrder", (q) =>
        q.eq("artistSlug", artistSlug),
      )
      .collect();
    return all
      .filter((w) => w.isPublished && (medium ? w.medium === medium : true))
      .sort((a, b) => {
        const ao = a.sortOrder ?? 0;
        const bo = b.sortOrder ?? 0;
        if (ao !== bo) return ao - bo;
        return (b.completedAt ?? b.createdAt) - (a.completedAt ?? a.createdAt);
      });
  },
});
