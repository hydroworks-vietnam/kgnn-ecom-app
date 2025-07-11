FROM node:20-alpine

WORKDIR /app

# Install OS dependencies
RUN apk add --no-cache libc6-compat

# Enable pnpm via corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy source files and lockfile
COPY package.json pnpm-lock.yaml ./
COPY . .

# Build environment vars
ARG PUBLIC_BACKEND_URL
ENV PUBLIC_BACKEND_URL=${PUBLIC_BACKEND_URL}
ENV NODE_ENV=production
ENV ASTRO_TELEMETRY_DISABLED=1

# Install dependencies and build the app
RUN pnpm install --frozen-lockfile
RUN pnpm build

# Expose Astro SSR default port
EXPOSE 4322

# Start the app
CMD ["pnpm", "start"]