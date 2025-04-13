import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

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

  // Keep the Netlify adapter but customize its configuration
  // adapter: netlify({
  //   edgeMiddleware: true  // Use Netlify edge functions to preserve URLs
  // }),
  output: 'server',
  // Ensure proper handling of dynamic routes
  trailingSlash: 'never'
});