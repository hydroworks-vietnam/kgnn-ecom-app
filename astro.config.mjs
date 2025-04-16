import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';

export default defineConfig({
  integrations: [
    react(),
    tailwind({
      // Explicitly point to your global CSS file
      config: {
        applyBaseStyles: true, // Ensure Tailwind base styles are applied
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
  adapter: netlify(),
});