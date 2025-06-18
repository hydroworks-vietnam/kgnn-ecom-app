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

ARG PUBLIC_BACKEND_URL
ENV PUBLIC_BACKEND_URL=${PUBLIC_BACKEND_URL}
ENV ASTRO_TELEMETRY_DISABLED=1

RUN apk add --no-cache libc6-compat

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN echo "Backend URL is: ${PUBLIC_BACKEND_URL}"
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

# Expose default Astro SSR port
EXPOSE 4322

# Start Astro SSR server
CMD ["yarn", "start"]