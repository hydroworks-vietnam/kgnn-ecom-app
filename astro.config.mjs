import { defineConfig, passthroughImageService } from "astro/config";
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import awsAmplify from 'astro-aws-amplify';

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
  adapter: awsAmplify(),
  image: {
    service: passthroughImageService(),
  },
});