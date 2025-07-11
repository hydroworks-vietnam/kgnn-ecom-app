FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache libc6-compat

RUN corepack enable && corepack prepare pnpm@latest --activate

ENV PNPM_CONFIG_STORE_DIR=/app/.pnpm-store
ENV PUBLIC_BACKEND_URL=${PUBLIC_BACKEND_URL}
ENV NODE_ENV=production
ENV ASTRO_TELEMETRY_DISABLED=1

COPY package.json pnpm-lock.yaml ./

# Use this if lockfile mismatch is suspected:
RUN pnpm install --no-frozen-lockfile

COPY . .

RUN pnpm build

EXPOSE 4322
CMD ["pnpm", "start"]