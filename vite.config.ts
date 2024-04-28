import { fileURLToPath, URL } from 'node:url';

import { sentryVitePlugin } from '@sentry/vite-plugin';
import vue from '@vitejs/plugin-vue';
import { defineConfig, loadEnv } from 'vite';
import svgLoader from 'vite-svg-loader';

import { getFonts } from './src/shared/fonts/unfonts';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  if (!env.SENTRY_AUTH_TOKEN) {
    console.warn('[WARN] Настройте Sentry согласно docs/start-checklist.md!');
  }

  return {
    plugins: [
      vue({
        script: {
          defineModel: true,
        },
      }),
      getFonts(),

      svgLoader({
        defaultImport: 'component',
        svgoConfig: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  removeViewBox: false,
                },
              },
            },
          ],
        },
      }),

      env.SENTRY_AUTH_TOKEN &&
        sentryVitePlugin({
          org: 'lipsar',
          url: 'https://sentry.lipsar.studio',
          project: env.SENTRY_PROJECT_NAME,
          authToken: env.SENTRY_AUTH_TOKEN,
          release: {
            name: env.SENTRY_RELEASE_NAME ?? undefined,
          },
        }),
    ],

    css: {
      modules: {
        localsConvention: 'camelCase',
      },
    },

    resolve: {
      alias: {
        app: fileURLToPath(new URL('./src/app', import.meta.url)),
        features: fileURLToPath(new URL('./src/features', import.meta.url)),
        shared: fileURLToPath(new URL('./src/shared', import.meta.url)),
        entities: fileURLToPath(new URL('./src/entities', import.meta.url)),
        widgets: fileURLToPath(new URL('./src/widgets', import.meta.url)),
        pages: fileURLToPath(new URL('./src/pages', import.meta.url)),
      },
    },

    server: {
      port: 3000,
    },

    build: {
      sourcemap: true,
    },
  };
});
