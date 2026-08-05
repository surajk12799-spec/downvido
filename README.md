# Downvido

Download. Save. Enjoy.

A Next.js 15 (App Router) + TypeScript + Tailwind CSS frontend for a social media video downloader. The frontend is fully built; the actual downloader API is **not connected yet** by design — see [Connecting a real downloader API](#connecting-a-real-downloader-api-later) below.

## Stack

- Next.js 15 (App Router), React 19, TypeScript (strict mode)
- Tailwind CSS 3 (custom brand/accent palette, dark mode via `next-themes`)
- Zero runtime dependencies beyond `next-themes` for the dark mode toggle

## Project structure

```
app/
  page.tsx                          Homepage
  layout.tsx                        Root layout, fonts, theme provider, global JSON-LD
  globals.css
  sitemap.ts                        Generates /sitemap.xml
  robots.ts                         Generates /robots.txt
  icon.tsx                          Generated favicon
  not-found.tsx                     Custom 404
  api/download/route.ts             Prepared (unconnected) backend API route
  instagram-video-downloader/page.tsx
  instagram-reels-downloader/page.tsx
  tiktok-video-downloader/page.tsx
  tiktok-downloader-without-watermark/page.tsx
  youtube-video-downloader/page.tsx
  youtube-shorts-downloader/page.tsx
  facebook-video-downloader/page.tsx
  facebook-reels-downloader/page.tsx
  twitter-video-downloader/page.tsx
  pinterest-video-downloader/page.tsx
  snapchat-video-downloader/page.tsx
  telegram-video-downloader/page.tsx
  about/page.tsx
  contact/page.tsx
  privacy-policy/page.tsx
  terms-of-service/page.tsx
  copyright/page.tsx
components/                         Header, Footer, DownloaderForm, platform page
                                     template, FAQ/how-it-works/feature sections, etc.
lib/
  site.ts                           Site-wide constants (name, nav, disclaimer, etc.)
  platforms.ts                      Per-platform SEO content, features, FAQs
  seo.ts                            Metadata builder (canonical + Open Graph + Twitter)
  structuredData.ts                 WebSite / SoftwareApplication / FAQPage / BreadcrumbList JSON-LD
public/
```

Every downloader route (`/instagram-video-downloader`, `/tiktok-video-downloader`, etc.) renders through one shared `PlatformPageContent` component but pulls unique titles, meta descriptions, H1s, intro copy, feature lists, and FAQs from `lib/platforms.ts` — so each page has distinct content and its own `FAQPage` + `BreadcrumbList` structured data, with no duplicate/thin content.

## Local development

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

Other useful scripts:

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # next lint
npm run build       # production build
```

> This project was generated in a sandboxed environment without internet access, so `npm install` / `npm run build` could not be executed here to confirm a clean build. Every import path and component boundary was manually verified, but please run `npm install && npm run build` yourself as the final check before deploying.

## Connecting a real downloader API (later)

`app/api/download/route.ts` is a fully prepared, secure API route stub:

- It validates the incoming URL and checks it against a list of supported platform hostnames.
- It **never** returns a fake success result — it always responds with `"Downloader API will be connected soon."` until you wire up a real provider.
- No API key is present anywhere in the code.
- Detailed comments in the file show exactly where to add your RapidAPI (or other provider) request, how to read the key from a server-only `.env.local` file, and how to normalize the response.

To connect a provider later:

1. Copy `.env.example` to `.env.local` and fill in your credentials (never commit `.env.local`).
2. Follow the `RAPIDAPI INTEGRATION GOES HERE` comment block in `app/api/download/route.ts`.
3. Update `components/DownloaderForm.tsx` if the response shape changes (it currently only reads a `message` field).

## Deploying

### 1. Push to GitHub

```bash
cd downvido
git init
git add .
git commit -m "Initial commit: Downvido frontend"
gh repo create downvido --private --source=. --remote=origin
git push -u origin main
```

(No GitHub CLI? Create an empty repo named `downvido` on github.com, then:)

```bash
git remote add origin https://github.com/<your-username>/downvido.git
git branch -M main
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to https://vercel.com/new and sign in.
2. Click **Import Project**, then select your `downvido` GitHub repository.
3. Vercel auto-detects Next.js — leave the default build command (`next build`) and output settings as-is.
4. If/when you connect a real downloader provider, add `RAPIDAPI_KEY` and `RAPIDAPI_HOST` under **Project Settings → Environment Variables** (do this before you need them in production; they are not required for the current build).
5. Click **Deploy**.
6. Once deployed, go to **Project Settings → Domains** and add `www.downvido.com` (and `downvido.com` redirecting to `www`), then update your DNS records as instructed by Vercel.

Every subsequent push to your `main` branch will auto-deploy.
