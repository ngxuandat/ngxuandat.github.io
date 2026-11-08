// Old fastpages URL for this post. Emitted as a real .html file so GitHub Pages serves it.
import { url } from '../../../../../lib/posts';

export function GET() {
  const to = url('/posts/2021-08-11-linked-the-new-science-of-networks/');
  return new Response(
    `<!doctype html><meta charset="utf-8"><title>Redirecting…</title><link rel="canonical" href="${to}"><meta http-equiv="refresh" content="0;url=${to}"><a href="${to}">This post has moved.</a>`,
    { headers: { 'Content-Type': 'text/html; charset=utf-8' } },
  );
}
