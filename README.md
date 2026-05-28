# ProfitBoard BG

ProfitBoard BG is a dashboard-first SaaS for tracking real e-commerce profit after product costs, delivery, packaging, payment fees, ad spend, returns, refunds and other expenses.

The first MVP supports manual daily tracking, products, orders, ad spend, expenses, CSV/XLSX imports, dashboard summaries, reports, alerts and standalone calculators.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL
- NextAuth Credentials
- Recharts
- date-fns
- Zod
- XLSX import support

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` from `.env.example`:

```bash
cp .env.example .env
```

3. Set environment variables:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/profitboard_bg"
NEXTAUTH_SECRET="replace-with-a-long-random-secret"
AUTH_SECRET="replace-with-the-same-long-random-secret"
NEXTAUTH_URL="http://localhost:3000"
ENABLE_DEMO_FALLBACK="false"
```

4. Start local PostgreSQL, if needed:

```bash
docker compose up -d
```

5. Create and migrate the database:

```bash
npx prisma migrate dev --name init
```

6. Seed demo data:

```bash
npm run seed
```

7. Run the app:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Test

```bash
npm test
```

The current test suite focuses on the financial calculation engine.

Full local checks after dependencies are installed:

```bash
npm run check
```

## Deployment

Recommended deployment:

- Vercel for the Next.js app
- Managed PostgreSQL for the database

Required environment variables:

- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `AUTH_SECRET`
- `NEXTAUTH_URL`
- `ENABLE_DEMO_FALLBACK`

Production database migration:

```bash
npx prisma migrate deploy
```

## Important Product Logic

The calculation engine lives in `src/lib/calculations/profit.ts`.

Core concepts:

- Delivered orders count toward confirmed revenue.
- Returned orders subtract refunds.
- Cancelled orders do not count toward revenue.
- Ad spend is counted by date.
- Fixed expenses are included in net profit.
- POAS is prioritized over ROAS because revenue efficiency can hide low or negative profit.

## Current MVP Pages

- `/login`
- `/register`
- `/dashboard`
- `/daily-input`
- `/daily-tracking`
- `/products`
- `/orders`
- `/ad-spend`
- `/expenses`
- `/imports`
- `/reports`
- `/settings`
- `/alerts`
- `/calculators/roas`
- `/calculators/poas`
- `/calculators/breakeven-roas`
- `/calculators/profit`

## Future Integration Hooks

Prepared service layers:

- `MetaAdsService`
- `MetaAdsEmailReportService`
- `AdSpendSyncService` style sync contract
- `ConvertBuilderService`
- `OrderSourceIntegration`

The MVP intentionally uses manual entry, CSV/XLSX imports and Meta email-report import first. Full Meta OAuth/API connection should be the last step.
