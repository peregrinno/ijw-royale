import { MantineThemeOverride, MantineColorsTuple } from '@mantine/core';

const colorSchema: MantineColorsTuple = [
  '#fff4e1',
  '#ffe8cc',
  '#fed09b',
  '#fdb766',
  '#fca13a',
  '#fc931d',
  '#fc8c0c',
  '#e17800',
  '#c86a00',
  '#af5a00'
];


export const theme: MantineThemeOverride = {
  colors: {
    colorSchema,
  },
  fontFamily: "'Bungee', sans-serif",
};
    