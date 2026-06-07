# analyse

Tableau de bord **Softnovation — Intelligence Marché & Performance** pour le diagnostic marché, l'acquisition clients, le CRM et la performance financière.

## Tech Stack

- **Next.js 15+** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Shadcn/UI-style components**
- **Recharts** (all charts)
- **@dnd-kit** (CRM Kanban drag & drop)
- **next-themes** (dark / light mode)
- **Local JSON** mock data + localStorage persistence for CRM & Strategy

## Getting Started

```bash
cd softnovation-dashboard
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Modules

| Route | Module |
|-------|--------|
| `/` | Global Dashboard + Insights Engine |
| `/clients` | Client segmentation & retention |
| `/leads` | Lead funnel & evolution |
| `/crm` | Drag & drop Kanban pipeline |
| `/acquisition` | Acquisition channel analysis |
| `/linkedin` | Personal branding metrics |
| `/social` | Multi-platform social media |
| `/finance` | CAC, LTV, ROI analysis |
| `/strategy` | Editable strategic documents |

## Mock Data

Based on real Softnovation benchmarks:

- 21 clients · 168 leads · 12.5% conversion
- 48% retention · 67% founder network dependency
- CAC 4,200 MAD · LTV 45,000 MAD

Data lives in `src/lib/data/` (TypeScript) and `data/mock-data.json`.

## Features

- KPI cards across all modules
- Recharts pie, bar, line, and funnel charts
- **Generate Business Insights** — SWOT analysis from live data
- CRM Kanban with drag & drop + activity logs
- Strategy docs with edit, tags, and version history
- Dark / light mode toggle
- Fully responsive sidebar navigation

## Build

```bash
npm run build
npm start
```
