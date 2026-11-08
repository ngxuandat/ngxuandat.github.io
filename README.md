# Dat Nguyen's blog

Personal blog built with [Astro](https://astro.build) + React, deployed to GitHub Pages at
https://ngxuandat.github.io.

## Writing a post

Add a file to `src/content/posts/` named `YYYY-MM-DD-some-title.md` (or `.mdx` to use components):

```md
---
title: My new post
description: One sentence shown on the home page.
tags: [economics, networks]
toc: true            # optional: "On this page" sidebar
image: /images/cover.png   # optional: put the file in public/images/
---

Write in Markdown here.
```

In `.mdx` posts you can use components, e.g.

```mdx
import Callout from '../../components/Callout.astro';

<Callout type="tip">Something worth highlighting.</Callout>
```

## Running locally

```bash
npm install
npm run dev      # http://localhost:4321
```

## Deploying

Pushing to `master` runs `.github/workflows/deploy.yml`, which builds the site and publishes it.
In the repo's **Settings → Pages**, set **Source** to **GitHub Actions**.

## Where things live

| Path | What |
|---|---|
| `src/content/posts/` | Blog posts |
| `src/pages/` | Other pages (about, resources, gallery, …) |
| `src/components/` | React (`.tsx`) and Astro components |
| `src/styles/global.css` | Colours, fonts, light/dark theme |
| `public/images/` | Images |
