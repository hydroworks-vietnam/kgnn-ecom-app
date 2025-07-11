# -------- Runtime stage --------
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy runtime files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/node_modules ./node_modules

# Expose Astro SSR port
EXPOSE 4322

CMD ["pnpm", "start"]