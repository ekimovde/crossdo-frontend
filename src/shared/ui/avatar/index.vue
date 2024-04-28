<template>
  <img :class="styles.avatar" :src="props.src" />
</template>

<script setup lang="ts">
import DefaultAvatar from './assets/avatar.png?url';
import styles from './styles.module.css';

interface AvatarProps {
  src?: string;
}

const props = withDefaults(defineProps<AvatarProps>(), {
  src: DefaultAvatar,
});
</script>
