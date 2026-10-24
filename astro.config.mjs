import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Preserve the existing spacing between inline elements after upgrading Astro.
  compressHTML: true,
  vite: {
    plugins: [tailwindcss()]
  },
  site: 'https://malevolentgods.com'
});
