import type { Component } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

// import { authNavigationGuard, loggedNavigationGuard } from 'features/auth/model/authNavGuard';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: (): Component => import('pages/(app)/layout.vue'),
      // beforeEnter: authNavigationGuard,
      children: [
        {
          path: '',
          name: 'home',
          component: (): Component => import('pages/(app)/courses/index.vue'),
        },
      ],
    },
    {
      path: '/',
      component: (): Component => import('pages/(app)/default.vue'),
      // beforeEnter: authNavigationGuard,
      children: [
        {
          path: '/:catchAll(.*)',
          name: '404',
          component: (): Component => import('pages/(app)/NotFound.vue'),
        },
      ],
    },
    {
      path: '/streams',
      component: (): Component => import('pages/(app)/layout.vue'),
      // beforeEnter: authNavigationGuard,
      children: [
        {
          path: '',
          name: 'streams',
          component: (): Component => import('pages/(app)/streams/index.vue'),
        },
      ],
    },
    {
      path: '/auth',
      component: (): Component => import('pages/(auth)/layout.vue'),
      // beforeEnter: loggedNavigationGuard,
      children: [
        {
          path: '',
          name: 'signIn',
          component: (): Component => import('pages/(auth)/sign-in/index.vue'),
        },
      ],
    },
  ],
});

export default router;
