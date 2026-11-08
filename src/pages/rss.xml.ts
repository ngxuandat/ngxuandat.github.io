import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts, postDate, postUrl, SITE } from '../lib/posts';

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site!,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: postDate(p),
      link: postUrl(p),
      categories: p.data.tags,
    })),
  });
}
