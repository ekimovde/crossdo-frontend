/// <reference types="vite/client" />
/// <reference types="@histoire/plugin-vue/components" />
/// <reference types="unplugin-fonts/client" />

interface ImportMetaEnv {
  readonly VITE_API_HOST: string;
  readonly VITE_SENTRY_DSN: string;
}
