import type { ConfigContext, ExpoConfig } from '@expo/config';
const path = require('path');

const APP_ENV = process.env.APP_ENV ?? 'development';
const envPath = path.resolve(__dirname, `.env.${APP_ENV}`);

require('dotenv').config({
  path: envPath,
});

const { Env, withEnvSuffix } = require('./env');

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: Env.NAME,
  description: `${Env.NAME} Mobile App`,
  slug: 'obytesapp',
  version: Env.VERSION.toString(),
  orientation: 'portrait',
  icon: `${withEnvSuffix('./assets/icon')}.png`,
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash2.png',
    resizeMode: 'cover',
    backgroundColor: '#F75469',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: Env.BUNDLE_ID,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: `${withEnvSuffix('./assets/icon')}.png`,
      backgroundColor: '#FFFFFF',
    },
    package: Env.PACKAGE,
  },
  web: {
    favicon: './assets/favicon.png',
  },
  plugins: [
    [
      '@bacons/link-assets',
      [
        './assets/fonts/Poppins-Bold.ttf',
        './assets/fonts/Poppins-SemiBold.ttf',
        './assets/fonts/Poppins-Black.ttf',
        './assets/fonts/Poppins-ExtraBold.ttf',
        './assets/fonts/Poppins-ThinItalic.ttf',
        './assets/fonts/Poppins-Thin.ttf',
        './assets/fonts/Poppins-Light.ttf',
        './assets/fonts/Poppins-Medium.ttf',
        './assets/fonts/Poppins-Regular.ttf',
      ],
    ],
    'expo-localization',
  ],
  extra: {
    APP_ENV: Env.APP_ENV,
  },
});
