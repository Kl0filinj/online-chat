import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: `'Inter', sans-serif`,
  },
  colors: {
    accent: {
      background: '#f6f2fd',
      black: '#111111',
      grey: '#11111199',
      darkGreyInSearchInput: '#535353',
      white: '#FFFFFF',
    },
  },
});

export default theme;
