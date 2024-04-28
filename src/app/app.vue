<template>
  <Theme>
    <main class="bg">
      <suspense>
        <router-view />
      </suspense>
    </main>
  </Theme>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';

import { Theme } from 'shared/ui';
</script>
