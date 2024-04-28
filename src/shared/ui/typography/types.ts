import fontClasses from './fonts.module.css';
import weightClasses from './weights.module.css';

export const weightMap = {
  '100': weightClasses.thin,
  '200': weightClasses.extraLight,
  '300': weightClasses.light,
  '400': weightClasses.regular,
  '500': weightClasses.medium,
  '600': weightClasses.semiBold,
  '700': weightClasses.bold,
  '800': weightClasses.extraBold,
  '900': weightClasses.black,
};

export type TypographyWeight = keyof typeof weightMap;

export const variantsMap = {
  h1: fontClasses.h1,
  h2: fontClasses.h2,
  h3: fontClasses.h3,
  'h3-semi': fontClasses['h3-semi'],

  'text-xl-0': fontClasses['text-xl-0'],
  'text-xl-1': fontClasses['text-xl-1'],
  'text-xl-2': fontClasses['text-xl-2'],
  'text-xl-3': fontClasses['text-xl-3'],

  'text-l-0': fontClasses['text-l-0'],
  'text-l-1': fontClasses['text-l-1'],
  'text-l-2': fontClasses['text-l-2'],
  'text-l-3': fontClasses['text-l-3'],

  'text-m-0': fontClasses['text-m-0'],
  'text-m-1': fontClasses['text-m-1'],
  'text-m-2': fontClasses['text-m-2'],
  'text-m-3': fontClasses['text-m-3'],

  'text-s-0': fontClasses['text-s-0'],
  'text-s-1': fontClasses['text-s-1'],
  'text-s-2': fontClasses['text-s-2'],
  'text-s-3': fontClasses['text-s-3'],

  'text-xs-0': fontClasses['text-xs-0'],
  'text-xs-1': fontClasses['text-xs-1'],
  'text-xs-2': fontClasses['text-xs-2'],
  'text-xs-3': fontClasses['text-xs-3'],

  'caption-m': fontClasses['caption-m'],
  'caption-s': fontClasses['caption-s'],
  'caption-xs': fontClasses['caption-xs'],

  label: fontClasses.label,

  'error-title': fontClasses['error-title'],
};

export type TypographyVariant = keyof typeof variantsMap;

type TextElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7' | 'span' | 'p';
export const elementMaps: Record<TypographyVariant, TextElement> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  'h3-semi': 'h3',

  'text-xl-0': 'span',
  'text-xl-1': 'span',
  'text-xl-2': 'span',
  'text-xl-3': 'span',

  'text-l-0': 'span',
  'text-l-1': 'span',
  'text-l-2': 'span',
  'text-l-3': 'span',

  'text-m-0': 'span',
  'text-m-1': 'span',
  'text-m-2': 'span',
  'text-m-3': 'span',

  'text-s-0': 'span',
  'text-s-1': 'span',
  'text-s-2': 'span',
  'text-s-3': 'span',

  'text-xs-0': 'span',
  'text-xs-1': 'span',
  'text-xs-2': 'span',
  'text-xs-3': 'span',

  'caption-m': 'span',
  'caption-s': 'span',
  'caption-xs': 'span',

  label: 'span',

  'error-title': 'h1',
};

export interface TypographyProps {
  variant: TypographyVariant;
  as?: string;
  weight?: TypographyWeight;
}
