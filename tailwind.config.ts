import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
const config: Config = {
  content: ['./pages/**/*.tsx', './components/**/*.tsx'],
  theme: {
    fontFamily: {
      ...defaultTheme.fontFamily,
      beni: ['Beni', 'Icons', 'Roboto', 'sans-serif'],
      inter: ['Inter', 'Roboto', 'Oxygen', 'Ubuntu', 'sans-serif'],
      icons: ['Icons', 'Roboto', 'sans-serif'],
      'monument-grotes': ['Monument-Grotes', 'Icons'],
      'monument-grotes-mono': ['Monument-Grotes-Mono', 'Icons'],
      'monument-grotesk-ultra': ['Monument-Grotesk-Ultra', 'Roboto', 'sans-serif'],
      'happy-times': ['Happy-Times-at-the-ikob', 'sans-serif'],
    },
    screens: {
      se: '376px',
      xs: '475px',
      // '3xl': '2048px',
      ...defaultTheme.screens,
    },
    containers: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '2048px',
    },

    extend: {
      aspectRatio: {
        '3/4': '3 / 4',
        '1/2': '1 / 2',
        artwork: '4 / 5',
      },
      colors: {
        cherup: '#f2c2f2',
        'cornflower-blue': '#2351fc',
        'neon-green': '#e6ff00',
        malachite: '#0fb73e',
        mariner: '#2259e0',
        'spring-wood': '#f7f7f0',
        'electric-blue': '#0000ff',
        'green-haze': '#019b67',
        sulu: '#cdea6a',
        'screaming-green': '#6cff42',
        'mint-green': '#a8ff8f',
        'brand-green': '#00D973',
        'celtic-blue': '#2467D8',
        'light-red': '#FF5C5C',
        'light-gray': '#E9E9E9',
        background: '#FCFCFC',
        'text-gray': '#808080',
        'kokushoku-black': '#191414',
        error: '#FF0000',
        primary: '#0F6BFF',
        helper: '#667085',
      },
      animation: {
        // @keyframes duration | easing-function | delay | iteration-count | direction | fill-mode | play-state | name */
        fadein: '2s linear 1s 1 normal forwards running fadein',
        fadeinshort: '1s linear 0s 1 normal forwards running fadeinshort',
        'madlib-imagepreview': '0.5s linear 0s 1 normal forwards running fadeinshort',
        'slide-left': '1s ease 1s 1 normal forwards running slide-left',
        'slide-right': '1s ease 1s 1 normal forwards running slide-right',
        'slide-up': '1s ease 1s 1 normal forwards running slide-up',
        'slide-up-quick': '0.2s ease 0s 1 normal forwards running slide-up-quick',
        'scrolling-text': 'scroll 60s linear infinite',
      },
      keyframes: {
        fadein: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeinshort: {
          from: { opacity: '0.3' },
          to: { opacity: '1' },
        },
        'slide-left': {
          from: { transform: 'translate(-25%,0)', opacity: '0.3' },
          to: { transform: 'translate(0,0)', opacity: '1' },
        },
        scroll: {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(100%)' },
        },
        'slide-right': {
          from: { transform: 'translate(25%,0)', opacity: '0.3' },
          to: { transform: 'translate(0,0)', opacity: '1' },
        },
        'slide-up': {
          from: { transform: 'translateY(100%)', opacity: '0.3' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-up-quick': {
          from: { transform: 'translateY(100%)', opacity: '0.6' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
      },
      gridTemplateColumns: {
        profile: 'auto 1fr',
        '6/4': '3fr 2fr',
      },
      transitionProperty: { snapshot: 'margin, top, right, bottom, left, width, height, opacity' },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/container-queries')],
};
export default config;
