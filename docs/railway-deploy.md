# Railway Deploy

BACKFORGE is ready for Railway GitHub auto-deploy using the repository `Dockerfile` plus `railway.json`.

## What Railway Uses

- Build: repository `Dockerfile`
- Pre-deploy: `npm run prisma:migrate:deploy`
- Start: `npm run start`
- Healthcheck: `GET /health`

The app already supports:

- `process.env.PORT` for the HTTP listener
- `DATABASE_URL` for Prisma/PostgreSQL
- `GET /health`

## Required Variables

- `DATABASE_URL`
- `JWT_SECRET`
- `REFRESH_SECRET`
- `APP_URL`
- `NODE_ENV=production`

## Optional Variables

- `REDIS_URL`
- `CORS_ORIGIN`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_BASIC`
- `STRIPE_PRICE_PRO`
- `LOG_LEVEL`

## Railway Setup

1. Push the repository to GitHub.
2. Create a new Railway project from the GitHub repo.
3. Provision a PostgreSQL service and map its connection string to `DATABASE_URL`.
4. Add the required environment variables above.
5. Deploy.

If you do not provision Redis, BACKFORGE still boots and serves traffic. Cache, queue processing, and Redis-backed rate limiting degrade gracefully.

## Deploy Behavior

- Prisma client is generated during `postinstall`.
- The build produces the API in `dist/server`, a small entrypoint in `dist/server.js`, and the frontend in `dist/client`.
- Railway builds with `DOCKERFILE`.
- Railway runs `npm run prisma:migrate:deploy` as a pre-deploy step, separate from application startup.
- Railway starts the app with `npm run start`, so the healthcheck only depends on the web server becoming ready.

## Local Smoke Test

```bash
npm run build
NODE_ENV=production npm run start
```
