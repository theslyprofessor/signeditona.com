/**
 * Seed — Signe Ditona portfolio for the standalone signeditona.com Convex
 * deployment. Idempotent: upserts the artist by slug, patches existing
 * works by title, inserts new ones. Run with:
 *   bunx convex run --prod portfolioSeed:seedSigne
 */
import { internalMutation } from "./_generated/server";

const SIGNE_SLUG = "signe-ditona";

interface WorkSeed {
  medium: "mural" | "voiceover" | "song" | "acting";
  title: string;
  subtitle?: string;
  description?: string;
  location?: string;
  year?: number;
  sourceUrl?: string;
  imageUrls?: string[];
  collaborators?: string[];
  tags?: string[];
  isFeatured?: boolean;
  sortOrder?: number;
}

const SIGNE_WORKS: WorkSeed[] = [
  {
    medium: "mural",
    title: "Vicente Fernández",
    subtitle: "Tribute to the king of ranchera",
    description:
      "A heart-led tribute to Vicente Fernández, painted shortly after his passing at 81. Signe described it as coming \"really naturally, right from the heart.\" The ranchera king held deep cultural importance to her family and to the communities the studio serves. The mural lives in a community art space hosting craft fairs and art shows.",
    location: "2460 Imperial Avenue, San Diego",
    year: 2022,
    collaborators: ["Paul Jimenez"],
    tags: ["music", "heritage", "tribute", "portrait"],
    sourceUrl:
      "https://www.10news.com/news/local-news/san-diego-artists-honor-mexican-singer-vicente-fernandez-with-mural",
    isFeatured: true,
    sortOrder: 0,
  },
  {
    medium: "mural",
    title: "Fernando Tatís Jr.",
    subtitle: "El Niño at home",
    location: "Ocean Beach, San Diego",
    description:
      "Larger-than-life mural of Padres shortstop Fernando Tatís Jr., one in a series honoring San Diego sports legends.",
    collaborators: ["Paul Jimenez"],
    tags: ["sports", "padres", "portrait"],
    sourceUrl:
      "https://www.cbs8.com/article/sports/mlb/padres/ground-floor-murals-making-san-diego-sports-larger-than-life-joe-musgrove-fernando-tatis-padres-tony-gwynn-artwork/509-88e83741-f79d-4781-8e91-6e7acb1c6864",
    isFeatured: true,
    sortOrder: 1,
  },
  {
    medium: "mural",
    title: "Tony Gwynn",
    subtitle: "Mr. Padre",
    location: "City Heights, San Diego",
    description:
      "Portrait of Padres legend Tony Gwynn rendered in Signe's signature photo-realism, part of Ground Floor Murals' running tribute to San Diego sports icons.",
    collaborators: ["Paul Jimenez"],
    tags: ["sports", "padres", "portrait"],
    isFeatured: true,
    sortOrder: 2,
  },
  {
    medium: "mural",
    title: "Junior Seau",
    subtitle: "Oceanside's own",
    location: "City Heights, San Diego",
    description: "Tribute to NFL Hall of Famer Junior Seau.",
    collaborators: ["Paul Jimenez"],
    tags: ["sports", "nfl", "portrait"],
    sortOrder: 3,
  },
  {
    medium: "mural",
    title: "Joe Musgrove",
    subtitle: "Hometown ace",
    location: "Grossmont High School, El Cajon",
    description:
      "Portrait of Padres no-hitter pitcher Joe Musgrove at his alma mater.",
    collaborators: ["Paul Jimenez"],
    tags: ["sports", "padres", "portrait"],
    sortOrder: 4,
  },
  {
    medium: "mural",
    title: "Manny Machado",
    subtitle: "Third base",
    location: "Chula Vista, California",
    description: "Padres star Manny Machado, rendered in photo-realism.",
    collaborators: ["Paul Jimenez"],
    tags: ["sports", "padres", "portrait"],
    sortOrder: 5,
  },
  {
    medium: "mural",
    title: "Yu Darvish",
    subtitle: "On the mound",
    location: "Convoy District, San Diego",
    description: "Padres ace Yu Darvish in a Convoy District tribute.",
    collaborators: ["Paul Jimenez"],
    tags: ["sports", "padres", "portrait"],
    sortOrder: 6,
  },
  {
    medium: "mural",
    title: "Frida and Diego",
    description:
      "Heritage portrait of Frida Kahlo and Diego Rivera, part of Signe's ongoing love letter to Mexican artistic lineage.",
    collaborators: ["Paul Jimenez"],
    tags: ["heritage", "portrait", "art-history"],
    sortOrder: 7,
  },
  {
    medium: "mural",
    title: "The Snow Leopard",
    description:
      "Photo-realistic snow leopard, a study in fur, gaze, and surrealism Signe is best known for.",
    collaborators: ["Paul Jimenez"],
    tags: ["wildlife", "photo-realism"],
    sortOrder: 8,
  },
  {
    medium: "mural",
    title: "The Jaguar",
    description:
      "Big cat portrait blending photo-realism with surrealist composition.",
    collaborators: ["Paul Jimenez"],
    tags: ["wildlife", "photo-realism"],
    sortOrder: 9,
  },
  {
    medium: "mural",
    title: "MLK",
    subtitle: "I have a dream",
    description: "Portrait of Dr. Martin Luther King Jr.",
    collaborators: ["Paul Jimenez"],
    tags: ["portrait", "civil-rights"],
    sortOrder: 10,
  },
  {
    medium: "mural",
    title: "2022 Tiger",
    description:
      "Year-of-the-Tiger mural, animal portraiture in photo-realistic textures.",
    collaborators: ["Paul Jimenez"],
    tags: ["wildlife", "photo-realism"],
    sortOrder: 11,
  },
  {
    medium: "mural",
    title: "Castle Park",
    description: "Community mural at Castle Park.",
    collaborators: ["Paul Jimenez"],
    sortOrder: 12,
  },
  {
    medium: "mural",
    title: "Hoffman",
    description: "Hoffman commission.",
    collaborators: ["Paul Jimenez"],
    sortOrder: 13,
  },
];

export const seedSigne = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();

    const existing = await ctx.db
      .query("portfolioArtists")
      .withIndex("by_slug", (q) => q.eq("slug", SIGNE_SLUG))
      .first();

    const artistData = {
      slug: SIGNE_SLUG,
      displayName: "Signe Ditona",
      tagline: "Muralist. Voice. Storyteller. San Diego.",
      bio: [
        "Signe MonteFalcon Ditona is a San Diego muralist, voice artist, and singer.",
        "She co-founded Ground Floor Murals in 2019, a public-art studio that gives back to the communities that raised her. Her hand favors photo-realism and surrealism: snow leopards rendered hair by hair, ranchera kings and Padres legends pulled from photo to wall. She is one of the official muralists of the San Diego Padres.",
        "Beyond the wall she works on camera and in the booth as a voice artist, and writes and sings her own songs. Across every medium her project is the same: instill self-love and pride in people, in heritage, and in the places that hold them.",
      ].join("\n\n"),
      location: "San Diego, California",
      accentColor: "#E8493A",
      links: [
        { label: "Ground Floor Murals", url: "https://www.groundfloormurals.com" },
        { label: "@signeditona on Instagram", url: "https://www.instagram.com/signeditona" },
        { label: "@groundfloormurals on Instagram", url: "https://www.instagram.com/groundfloormurals" },
        { label: "IMDb", url: "https://www.imdb.com/name/nm9576985/" },
        { label: "KPBS feature", url: "https://www.kpbs.org/news/local/2022/09/15/muralist-finds-inspiration-in-mexican-heritage" },
      ],
      isPublic: true,
      updatedAt: now,
    };

    let artistId;
    if (existing) {
      await ctx.db.patch(existing._id, artistData);
      artistId = existing._id;
    } else {
      artistId = await ctx.db.insert("portfolioArtists", {
        ...artistData,
        createdAt: now,
      });
    }

    let inserted = 0;
    let patched = 0;
    for (const work of SIGNE_WORKS) {
      const dupe = await ctx.db
        .query("portfolioWorks")
        .withIndex("by_artistSlug_sortOrder", (q) =>
          q.eq("artistSlug", SIGNE_SLUG),
        )
        .filter((q) => q.eq(q.field("title"), work.title))
        .first();
      if (dupe) {
        await ctx.db.patch(dupe._id, {
          subtitle: work.subtitle,
          description: work.description,
          location: work.location,
          year: work.year,
          collaborators: work.collaborators,
          tags: work.tags,
          sourceUrl: work.sourceUrl,
          isFeatured: work.isFeatured ?? false,
          updatedAt: now,
        });
        patched++;
        continue;
      }
      await ctx.db.insert("portfolioWorks", {
        artistSlug: SIGNE_SLUG,
        ...work,
        isFeatured: work.isFeatured ?? false,
        isPublished: true,
        createdAt: now,
        updatedAt: now,
      });
      inserted++;
    }

    return { artistId, inserted, patched, total: SIGNE_WORKS.length };
  },
});
