# Fonts

Set up fonts in `unfonts.ts` like this:

```ts
export const getFonts = () => {
  return Unfonts({
    custom: {
      display: 'swap',
      preload: false,
      prefetch: false,
      injectTo: 'head-prepend',
      families: [
        {
          name: 'Inter',
          local: 'Inter',
          src: './src/shared/fonts/*.ttf',
          transform(font): CustomFontFace {
            const fontNameMap: Record<string, number> = {
              'Inter-Black': 900,
              'Inter-ExtraBold': 800,
              'Inter-Bold': 700,
              'Inter-SemiBold': 600,
              'Inter-Medium': 500,
              'Inter-Regular': 400,
              'Inter-Light': 300,
              'Inter-ExtraLight': 200,
              'Inter-Thin': 100,
            };
            if (fontNameMap[font.basename]) {
              font.weight = fontNameMap[font.basename];
            }
            return font;
          },
        },
      ],
    },
  });
};
```

This file is then called from the `vite.config.ts`. It bundles font files and makes a font family name available in CSS.

## Customizing typography

Inside the project, you shouldn't use `h1-6`, `p`, `span` elements. Instead, use `<typography>` component. It "connects" to the Figma designs and only shows the correct text styles defined by designers.

```vue
<template>
  <template variant="h1">Hello, world!</template>
</template>
```
