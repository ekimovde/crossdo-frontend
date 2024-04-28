import type { CustomFontFace } from 'unplugin-fonts/types';
import Unfonts from 'unplugin-fonts/vite';
import type { Plugin } from 'vite';

export const getFonts = (): Plugin | Plugin[] => {
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
