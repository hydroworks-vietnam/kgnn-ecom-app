import { defineConfig } from "astro/config";
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';

export default defineConfig({
  integrations: [
    react(),
    tailwind({
      config: {
        applyBaseStyles: true,
        configFile: './tailwind.config.js',
      },
    }),
  ],
  vite: {
    resolve: {
      alias: {
        '@': '/src'
      }
    }
  },
  output: 'server',
  trailingSlash: 'never',
  adapter: node({
    mode: 'standalone'
  }),
  server: { port: 4321, host: '0.0.0.0' } // Bind to all interfaces
});