import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';

export default defineConfig({
  output: 'server', // SSR mode
  adapter: node({
    mode: 'standalone', // Standalone mode for Azure Functions
  }),
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: true,
      configFile: './tailwind.config.js', // Ensure this file exists
    }),
  ],
  vite: {
    resolve: {
      alias: {
        '@': '/src', // Path alias for cleaner imports
      },
    },
  },
  server: {
    port: 4322,
    host: '0.0.0.0', // Allow external access for local testing
  },
  trailingSlash: 'never', // Consistent URL handling
});