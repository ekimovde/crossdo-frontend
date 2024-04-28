import { defineSetupVue3 } from '@histoire/plugin-vue';
import { createPinia } from 'pinia';

import 'modern-normalize/modern-normalize.css';
import 'unfonts.css';
import 'app/main.css';

import { Theme } from './theme';
import { Typography } from './typography';

export const setupVue3 = defineSetupVue3(({ app, addWrapper }) => {
  const pinia = createPinia();
  app.use(pinia);
  app.component('typography', Typography);
  addWrapper(Theme);
});
