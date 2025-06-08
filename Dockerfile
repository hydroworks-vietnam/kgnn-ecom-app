# Use the official Node.js 20 image as the base
FROM node:20-slim

# Set working directory
WORKDIR /app

ARG PUBLIC_BACKEND_URL
ENV PUBLIC_BACKEND_URL=${PUBLIC_BACKEND_URL}

# Copy package.json and yarn.lock from the project root
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code from the project root
COPY . .

# Build the Astro project
ENV ASTRO_TELEMETRY_DISABLED=1
RUN PUBLIC_BACKEND_URL=$PUBLIC_BACKEND_URL yarn build

# Expose the port Astro uses (default: 4321)
EXPOSE 4321

# Command to start the Astro server
CMD ["yarn", "start"]