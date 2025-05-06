# Use the official Node.js 20 image as the base
FROM node:20-alpine

# Set working directory
WORKDIR /app

ARG PUBLIC_BACKEND_URL
ENV PUBLIC_BACKEND_URL=${PUBLIC_BACKEND_URL}

COPY kgnn-melon/package.json kgnn-melon/yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY kgnn-melon/ .

# Build the Astro project
RUN PUBLIC_BACKEND_URL=$PUBLIC_BACKEND_URL yarn build

# Expose the port Astro uses (default: 4321)
EXPOSE 4321

# Command to start the Astro server
CMD ["yarn", "start"]