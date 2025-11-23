# LaserIO Frontend

Full-featured frontend application for a laser & optoelectronic components catalog built with Next.js.

## Features

- Browse catalog with category tree navigation
- Product search and filtering
- Shopping cart with persistent storage (Zustand + localStorage)
- Order submission with API fallback to mailto
- Responsive design (desktop-first)
- SEO optimized with metadata generation
- Docker + Nginx setup for local development with API proxy

## Tech Stack

- Next.js 16+
- TypeScript
- TailwindCSS
- Zustand (state management)
- React Query (data fetching)

## Getting Started

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Set environment variable (optional, defaults to production API):
```bash
# Create .env.local
NEXT_PUBLIC_API_BASE=https://tamasaya.ru/api/laserio
```

3. Run development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## Docker Setup

The project includes Docker and Nginx configuration for local development with API proxying.

### Running with Docker

1. Build and start containers:
```bash
docker compose up --build
```

2. Access the application:
- Frontend: http://localhost:8100
- API requests are proxied through Nginx to https://tamasaya.ru/api/laserio
- Images/media are proxied from https://tamasaya.ru

### Docker Services

- **web**: Next.js application (port 3000 internally)
- **nginx**: Reverse proxy (exposes port 80)

Nginx configuration:
- Proxies `/api/laserio/*` to production API
- Proxies `/media/*` and `/uploads/*` to production server
- Serves frontend from Next.js container

## Project Structure

```
app/
  ├── page.tsx              # Homepage
  ├── categories/           # Catalog map page
  ├── catalog/[slug]/       # Category pages
  ├── products/[slug]/      # Product detail pages
  ├── cart/                 # Shopping cart
  └── checkout/             # Checkout form

components/
  ├── Header.tsx
  ├── Footer.tsx
  ├── CategoryTree.tsx
  ├── ProductCard.tsx
  ├── CartDrawer.tsx
  └── ...

lib/
  ├── api.ts                # API client functions
  ├── hooks.ts              # React Query hooks
  └── types.ts              # TypeScript types

store/
  └── cart.ts               # Zustand cart store
```

## API Integration

Base API URL: `https://tamasaya.ru/api/laserio`

Endpoints:
- `GET /categories/tree` - Get category tree
- `GET /categories/:slug` - Get category with children/products
- `GET /products/:slug` - Get product details
- `POST /orders` - Submit order (with mailto fallback)

## License

Private project
