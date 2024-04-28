/* eslint-disable */

import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import autoprefixer from 'autoprefixer';
import nested from 'postcss-nested';
import customMedia from 'postcss-custom-media';
import postcssGlobalData from '@csstools/postcss-global-data';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: [
    postcssGlobalData({
      files: [join(__dirname, 'src', 'shared', 'ui', 'theme', 'media.css')],
    }),
    autoprefixer,
    customMedia,
    nested,
  ],
};

export default config;
