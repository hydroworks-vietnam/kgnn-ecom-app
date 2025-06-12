# -------- Base stage: install dependencies --------
FROM node:20-alpine AS deps

WORKDIR /app

# Install necessary native dependencies
RUN apk add --no-cache libc6-compat

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile


# -------- Builder stage --------
FROM node:20-alpine AS builder

WORKDIR /app

# Set build-time argument
ENV PUBLIC_BACKEND_URL=${PUBLIC_BACKEND_URL}
ENV ASTRO_TELEMETRY_DISABLED=1

# Install build dependencies
RUN apk add --no-cache libc6-compat

# Copy installed node_modules from deps
COPY --from=deps /app/node_modules ./node_modules

# Copy app source
COPY . .

# Build Astro app (static or SSR)
RUN yarn build


# -------- Final minimal image --------
FROM node:20-alpine AS runner

WORKDIR /app

# Only keep runtime essentials
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/node_modules ./node_modules

# Runtime environment variable (can be overridden in docker-compose)
ENV NODE_ENV=production
ENV PUBLIC_BACKEND_URL=""

# Start the Astro server (SSR mode)
CMD ["yarn", "start"]
