# Use the official Node.js 20 image as the base
FROM node:20-alpine

# Set working directory
WORKDIR /app

COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the Astro project
RUN yarn build

# Expose the port Astro uses (default: 4321)
EXPOSE 5432

# Command to start the Astro server
CMD ["yarn", "start"]