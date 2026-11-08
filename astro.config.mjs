// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://ngxuandat.github.io',
  base: '/',
  trailingSlash: 'ignore',
  integrations: [react(), mdx()],
  markdown: {
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' } },
  },
  // Keep old links working: fastpages (/blog era), see also src/pages/markdown/,
  // and the previous Jekyll site at this address.
  redirects: {
    '/categories': '/tags/',
    '/2021/08/11/Linked-The-New-Science-of-Networks.html': '/posts/2021-08-11-linked-the-new-science-of-networks/',
    '/thoughts/2023/05/03/How-to-study-physics-as-a-CS-student.html': '/posts/2023-05-10-how-to-study-physics-as-it-student/',
    '/thoughts/2024/03/02/learning-IT.html': '/posts/2024-03-02-the-three-ways-to-learn-it/',
  },
});
