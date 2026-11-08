import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

/** Prefix a site-relative path with the configured base ("/"). */
export function url(path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}

export function postDate(post: Post): Date {
  if (post.data.date) return post.data.date;
  const m = post.id.match(/^(\d{4}-\d{2}-\d{2})/);
  return m ? new Date(`${m[1]}T00:00:00Z`) : new Date(0);
}

export function postUrl(post: Post): string {
  return url(`/posts/${post.id}/`);
}

export function formatDate(d: Date): string {
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
}

export function readingTime(body = ''): number {
  return Math.max(1, Math.round(body.split(/\s+/).length / 220));
}

export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', (p) => !p.data.draft);
  return posts.sort((a, b) => postDate(b).getTime() - postDate(a).getTime());
}

export const SITE = {
  title: "Dat Nguyen's blog",
  description: 'Notes on economics, networks, complexity, physics and learning things the long way.',
  author: 'Dat Nguyen',
  github: 'https://github.com/ngxuandat',
  twitter: 'https://twitter.com/ngxuandat',
};
