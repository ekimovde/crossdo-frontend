# Theme component

`Theme` component is a wrapper around the App. It enables useful APIs like `openToast`, `openConfirm`, Tooltips and other UI logic. It also applied all style variables to be used in the app: colors, spacings, radiuses. 

```vue
<template>
  <Theme>
    <main>
      <RouterView />
    </main>
  </Theme>
</template>

<script lang="ts" setup>
  import { Theme } from 'shared/ui';
</script>
```
