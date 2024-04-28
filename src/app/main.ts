import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { createApp } from 'vue';

import { Typography } from 'shared/ui';

import App from './app.vue';
import router from './router';

import 'modern-normalize/modern-normalize.css';
import 'unfonts.css';
import './main.css';

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);
app.component('typography', Typography);

app.mount('#app');
