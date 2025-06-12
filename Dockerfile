# -------- Base stage: install dependencies --------
FROM node:20-alpine AS deps

WORKDIR /app

# Install native dependencies (for things like sharp, tailwind, etc.)
RUN apk add --no-cache libc6-compat

# Copy only dependency-related files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile


# -------- Builder stage --------
FROM node:20-alpine AS builder

WORKDIR /app

# Disable Astro telemetry
ENV ASTRO_TELEMETRY_DISABLED=1

# Install build dependencies
RUN apk add --no-cache libc6-compat

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY . .

# Build the Astro app
RUN yarn build


# -------- Runtime stage --------
FROM node:20-alpine AS runner

WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Copy only what’s needed for runtime
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/node_modules ./node_modules

# PUBLIC_BACKEND_URL is used at runtime via process.env
# So no need to bake it in — just use docker-compose/env

# Expose default Astro SSR port
EXPOSE 4322

# Start Astro SSR server
CMD ["yarn", "start"]