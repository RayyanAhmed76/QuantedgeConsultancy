# Consultancy — Vercel deploy

This Next.js app uses `basePath: "/consultancy"`.

## Deploy

1. Import this repo on Vercel (separate project from the main marketing site).
2. Framework: Next.js (default).
3. Set Environment Variables (Production):

```env
NEXT_PUBLIC_SITE_URL=https://quantedgedatasolutions.com/consultancy
API_BASE_URL=https://quantedgedatasolutions.com
SITE_KEY=<same as Railway CONSULTANCY_SITE_KEY>
NEXT_PUBLIC_GA_ID=
```

4. Deploy. Copy the `*.vercel.app` hostname.
5. On the **main** site’s `modal-clone/vercel.json`, set the `/consultancy` rewrite destinations to that hostname (see `modal-clone/DEPLOY-VERCEL-RAILWAY.md`).
6. Do **not** attach the Namecheap custom domain to this project — the main Vercel project owns the domain and rewrites `/consultancy` here.

## Forms

Browser → `POST /consultancy/api/contact` (this app) → server forwards to  
`{API_BASE_URL}/api/submissions/consultancy` with `X-Site-Key`.
