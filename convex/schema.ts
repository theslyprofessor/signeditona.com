/**
 * signeditona.com — standalone Convex schema.
 *
 * Self-contained: only the two portfolio tables the public site reads.
 * Decoupled from midimaze prod so nothing midimaze deploys can wipe it.
 *
 * Per-row `imageUrls` / `audioUrls` hold public URLs (external CDN or,
 * later, Convex `_storage` URLs) so v1 ships without a storage migration.
 */
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const portfolioMedium = v.union(
  v.literal("mural"),
  v.literal("voiceover"),
  v.literal("song"),
  v.literal("acting"),
);

export default defineSchema({
  portfolioArtists: defineTable({
    slug: v.string(),
    displayName: v.string(),
    tagline: v.optional(v.string()),
    bio: v.optional(v.string()),
    heroImageUrl: v.optional(v.string()),
    accentColor: v.optional(v.string()),
    location: v.optional(v.string()),
    links: v.optional(
      v.array(
        v.object({
          label: v.string(),
          url: v.string(),
        }),
      ),
    ),
    adminEmails: v.optional(v.array(v.string())),
    isPublic: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
  }).index("by_slug", ["slug"]),

  portfolioWorks: defineTable({
    artistSlug: v.string(),
    medium: portfolioMedium,
    title: v.string(),
    subtitle: v.optional(v.string()),
    description: v.optional(v.string()),
    location: v.optional(v.string()),
    year: v.optional(v.number()),
    completedAt: v.optional(v.number()),
    imageUrls: v.optional(v.array(v.string())),
    audioUrls: v.optional(v.array(v.string())),
    videoUrl: v.optional(v.string()),
    sourceUrl: v.optional(v.string()),
    collaborators: v.optional(v.array(v.string())),
    tags: v.optional(v.array(v.string())),
    isFeatured: v.boolean(),
    isPublished: v.boolean(),
    sortOrder: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
  })
    .index("by_artistSlug_medium", ["artistSlug", "medium"])
    .index("by_artistSlug_sortOrder", ["artistSlug", "sortOrder"])
    .index("by_published", ["isPublished", "artistSlug"]),
});
