# QuantEdgeDataSolutions

Marketing site for QuantEdgeDataSolutions (Next.js App Router): advisory, process optimization, market intelligence, BI decision support, and regulation & compliance.

## Requirements

- Node.js **20+**
- npm

## Local development

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm run start
```

## Environment variables

Copy `.env.example` to `.env.production` (or export vars in the process manager) on the server:

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Yes in production | Absolute site origin for sitemap, robots, and Open Graph (e.g. `https://www.your-domain.com`) |

No trailing slash.

## SEO

- `/robots.txt` — `src/app/robots.ts`
- `/sitemap.xml` — `src/app/sitemap.ts`
- Open Graph / Twitter defaults — `src/app/layout.tsx`
- Per-page titles and descriptions on main routes

- Open Graph / Twitter share image — `public/og.png` (1200×630)

## Deploy on EC2 (overview)

1. Point DNS (A record) at an **Elastic IP**.
2. Install Node 20 on Ubuntu (or similar).
3. Clone the repo, install, build:

```bash
git clone <your-repo-url> /var/www/consultancy
cd /var/www/consultancy
npm ci
export NEXT_PUBLIC_SITE_URL=https://www.your-domain.com
npm run build
```

4. Run with **PM2** (example):

```bash
npm i -g pm2
pm2 start npm --name consultancy -- start
pm2 save
pm2 startup
```

Or use a systemd unit that runs `npm run start` with `WorkingDirectory=/var/www/consultancy` and `Environment=NODE_ENV=production` plus `NEXT_PUBLIC_SITE_URL=...`.

5. Put **Nginx** in front (TLS via Certbot). Example location:

```nginx
server {
  listen 80;
  server_name www.your-domain.com your-domain.com;
  return 301 https://www.your-domain.com$request_uri;
}

server {
  listen 443 ssl http2;
  server_name www.your-domain.com;

  # ssl_certificate / etc. via certbot

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

6. Security group: allow **22** (restricted), **80**, **443**. Do not expose port **3000** publicly.

### Updates

```bash
cd /var/www/consultancy
git pull
npm ci
npm run build
pm2 restart consultancy
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |

## Images

Content photos use `next/image` via `src/components/OptimizedImage.tsx` (resize, modern formats, lazy loading). On EC2, run `npm ci` on Linux so the Sharp binary is correct.

## Notes

- Contact forms validate and rate-limit on the server, then forward to the main QuantEdge API (`API_BASE_URL` + `SITE_KEY` → `/api/submissions/consultancy`) for the shared admin inbox. Keep `SITE_KEY` server-only (never `NEXT_PUBLIC_`).
- Forms also use honeypot + minimum fill-time checks, same-origin enforcement, body size limits, and HTML stripping on inputs.
- Security headers (CSP, frame deny, nosniff, COOP/CORP) are set in `next.config.ts`.
- Google Analytics loads only after cookie consent (`NEXT_PUBLIC_GA_ID`).
