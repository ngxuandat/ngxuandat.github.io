import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    // Falls back to the YYYY-MM-DD prefix of the filename (see lib/posts.ts).
    date: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    toc: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
