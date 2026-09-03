# Build-in-public journal

A simple, fast, statically-exported website for documenting your journey
starting a business — and a safe sandbox for practicing SEO and Google
Analytics on your own content.

Built with **Next.js (App Router) + Markdown**. You write posts as plain
`.md` files; the site generates static HTML, a sitemap, and structured data
for you. As a former software engineer you'll be comfortable here: it's just
files and a build command, no CMS.

---

## Table of contents

1. [How the site is organized](#1-how-the-site-is-organized)
2. [Adding a new blog post](#2-adding-a-new-blog-post)
3. [Configuring your site (name, URL, analytics)](#3-configuring-your-site)
4. [Running and building locally](#4-running-and-building-locally)
5. [Deploying for free](#5-deploying-for-free)
   - [Option A — Netlify (recommended)](#option-a--netlify-recommended)
   - [Option B — GitHub Pages](#option-b--github-pages)
   - [Connecting a custom domain](#connecting-a-custom-domain)
6. [Setting up GA4](#6-setting-up-google-analytics-ga4)
7. [Setting up Google Search Console](#7-setting-up-google-search-console)
8. [5 starter SEO experiments](#8-five-starter-seo-experiments)

---

## 1. How the site is organized

```
content/blog/            ← your posts live here, one .md file per post
lib/site-config.ts       ← your name, URL, GA4 + Search Console slots
lib/blog.ts              ← reads/renders Markdown (you rarely touch this)
app/page.tsx             ← homepage
app/about/page.tsx       ← about & services page
app/blog/page.tsx        ← the journal index
app/blog/[slug]/page.tsx ← a single post
app/sitemap.ts           ← auto-generated /sitemap.xml
app/robots.ts            ← auto-generated /robots.txt
public/_headers          ← security headers (Netlify)
```

Everything that appears in navigation, the sitemap, and social cards is
derived automatically from your content and `lib/site-config.ts`.

---

## 2. Adding a new blog post

Create a new file in `content/blog/`, for example
`content/blog/my-new-post.md`. The filename (minus `.md`) becomes the URL:
`/blog/my-new-post`.

Start it with a "frontmatter" block, then write in Markdown:

```md
---
title: "My New Post Title"
description: "One or two sentences. This becomes the meta description — great for SEO experiments."
date: "2026-02-15"
author: "Freddy Hernandez"
tags: ["seo", "lessons"]
draft: false
---

Your content here. Use normal Markdown:

## A heading

- bullet points
- [links to other posts](/blog/finding-my-first-clients)

Regular paragraphs, **bold**, _italic_, and so on.
```

Notes:
- `date` must be `YYYY-MM-DD`. Posts are sorted newest-first automatically.
- Set `draft: true` to keep a post out of the site while you work on it.
- Reading time and the sitemap entry are generated for you.

That's the whole workflow: add a file, commit, push. Your host rebuilds and
the post is live.

---

## 3. Configuring your site

Open `lib/site-config.ts` and edit the values at the top: your `name`,
`role`, `tagline`, `description`, and your social links.

**The one value you must change before launch is `url`** — set it to your real
deployed URL (e.g. `https://northbound.com`). It powers canonical URLs, the
sitemap, `robots.txt`, and social cards.

You can set these three via environment variables instead of editing code,
which is handy on hosts:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Your live URL |
| `NEXT_PUBLIC_GA_ID` | GA4 Measurement ID (`G-XXXXXXXXXX`) |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Google Search Console meta token |

If a value is empty, the related feature simply doesn't render — so local dev
stays clean with no analytics firing.

---

## 4. Running and building locally

```bash
pnpm install      # first time only
pnpm dev          # start the dev server at http://localhost:3000
pnpm build        # produce the static site in ./out
```

`pnpm build` runs `next build`, which — because of `output: 'export'` in
`next.config.mjs` — writes a fully static site to the `out/` folder. That
folder is what gets deployed.

---

## 5. Deploying for free

You have a static site in `out/`, so any static host works. Push your code to
a GitHub repository first (create one at github.com, then):

```bash
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

### Option A — Netlify (recommended)

Netlify is the easiest path and it honors the `public/_headers` security file.

1. Go to [netlify.com](https://netlify.com) and sign up with GitHub.
2. **Add new site → Import an existing project → GitHub**, then pick your repo.
3. Set the build settings:
   - **Build command:** `pnpm build`
   - **Publish directory:** `out`
4. Click **Deploy**. In ~1 minute you'll get a `your-site.netlify.app` URL.
5. Add your environment variables under **Site settings → Environment
   variables** (`NEXT_PUBLIC_SITE_URL`, and later your GA4/GSC values), then
   trigger a redeploy.

Every `git push` to `main` now redeploys automatically.

### Option B — GitHub Pages

GitHub Pages is fully free but can't set custom headers (that's fine). Add a
workflow file at `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with: { version: 9 }
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
        env:
          NEXT_PUBLIC_SITE_URL: https://<you>.github.io/<repo>
      - uses: actions/upload-pages-artifact@v3
        with: { path: out }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
    steps:
      - uses: actions/deploy-pages@v4
```

Then in your repo: **Settings → Pages → Build and deployment → Source:
GitHub Actions**. Push to `main` and it deploys.

> If your site lives at `https://<you>.github.io/<repo>` (a sub-path rather
> than a root domain), add `basePath: '/<repo>'` to `next.config.mjs` so
> assets resolve. If you use a custom domain (below), you don't need this.

### Connecting a custom domain

After buying a domain (Namecheap, Cloudflare, Google Domains, etc.):

**On Netlify:** Site settings → **Domain management → Add a domain** → enter
your domain. Netlify shows you the DNS records to set. Easiest is to change
your registrar's **nameservers** to Netlify's; otherwise add the `A` /
`CNAME` records they list. HTTPS is provisioned automatically.

**On GitHub Pages:** Settings → Pages → **Custom domain** → enter your domain.
Then at your registrar create:
- Four `A` records for the apex domain (`@`) pointing to
  `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- A `CNAME` record for `www` pointing to `<you>.github.io`

Tick **Enforce HTTPS** once DNS propagates (can take up to a day).

**After the domain is live**, update `NEXT_PUBLIC_SITE_URL` (or `url` in
`site-config.ts`) to the new domain and redeploy so canonical URLs and the
sitemap are correct.

---

## 6. Setting up Google Analytics (GA4)

1. Go to [analytics.google.com](https://analytics.google.com) → **Admin** →
   **Create → Property**. Name it, set your timezone/currency.
2. Under the property, create a **Web** data stream with your site URL.
3. Copy the **Measurement ID** — it looks like `G-XXXXXXXXXX`.
4. Set it on your host as `NEXT_PUBLIC_GA_ID` (Netlify: Environment variables;
   or edit `gaMeasurementId` in `lib/site-config.ts`) and redeploy.
5. Visit your live site, then check GA4 → **Reports → Realtime**. You should
   see yourself as an active user within a minute.

The tag is already wired up in `components/google-analytics.tsx`; it only
loads when the ID is present, so nothing fires in local dev.

---

## 7. Setting up Google Search Console

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
   → **Add property**.
2. If you have a custom domain, choose **Domain** (verify via a DNS `TXT`
   record — most thorough). Otherwise choose **URL prefix** and use the
   **HTML tag** method.
3. For the HTML tag method, copy the `content="..."` value from the
   `<meta name="google-site-verification" ...>` snippet, set it as
   `NEXT_PUBLIC_GSC_VERIFICATION` (or `gscVerification` in
   `lib/site-config.ts`), and redeploy. The site injects the meta tag for you.
4. Back in Search Console, click **Verify**.
5. Go to **Sitemaps** and submit `sitemap.xml`. Your sitemap lives at
   `https://your-domain.com/sitemap.xml` and updates automatically as you add
   posts.

Search Console data takes a few days to populate — that's normal.

---

## 8. Five starter SEO experiments

Your own site is the perfect low-stakes lab. Run one variable at a time and
give each change 2–4 weeks before judging it in Search Console.

1. **Meta description CTR test.** Rewrite the `description` frontmatter on 2–3
   posts to be more benefit-driven. Watch **average CTR** for those pages in
   Search Console (Performance → filter by page). Does a better description
   earn more clicks at the same position?

2. **Internal linking for indexing & engagement.** Ensure every post links to
   at least two others (the samples already do). Compare how quickly new posts
   get indexed and whether **pages-per-session** rises in GA4.

3. **Long-tail keyword targeting.** Write one post around a specific phrase a
   founder would actually search (e.g. "how to price a marketing pilot
   project"). Track whether that page starts appearing for that query and
   related ones.

4. **Title format A/B.** Publish some posts with narrative "How I…" titles and
   others with plain "How to…" titles. After a few of each, compare average
   position and CTR between the two styles.

5. **Content depth / freshness.** Take an older post, expand it substantially
   (add examples, numbers, a FAQ), and bump its `date`. Watch whether the
   refreshed page climbs in impressions and position — a good proxy for how
   Google rewards depth and freshness.

Keep a simple log (even a Markdown post here) of what you changed, when, and
what happened. That log becomes a real playbook you can reuse with clients.
