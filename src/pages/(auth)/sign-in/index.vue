<template>
  <div :class="styles.container">
    <div :class="styles.column">
      <div :class="styles.form">
        <AuthForm />
      </div>
    </div>

    <div :class="styles.column" />
  </div>
</template>

<script setup lang="ts">
import { AuthForm } from 'widgets/auth-form';

import styles from './styles.module.css';
</script>
