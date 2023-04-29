import type { ColorMode } from 'native-base';
import { extendTheme } from 'native-base';

const theme = extendTheme({
  fontConfig: {
    Poppins: {
      100: {
        normal: '../../assets/fonts/Poppins-Thin.ttf',
      },
      200: {
        normal: '../../assets/fonts/Poppins-Black.ttf',
      },
      300: {
        normal: '../../assets/fonts/Poppins-Regular.ttf',
      },
      400: {
        normal: '../../assets/fonts/Poppins-Medium.ttf',
      },
      500: {
        normal: '../../assets/fonts/Poppins-Bold.ttf',
      },
      600: {
        normal: '../../assets/fonts/Poppins-SemiBold.ttf',
      },
      700: {
        normal: '../../assets/fonts/Poppins-ExtraBold.ttf',
      },
      // Add more variants
      //   700: {
      //     normal: 'Roboto-Bold',
      //   },
      //   800: {
      //     normal: 'Roboto-Bold',
      //     italic: 'Roboto-BoldItalic',
      //   },
      //   900: {
      //     normal: 'Roboto-Bold',
      //     italic: 'Roboto-BoldItalic',
      //   },
    },
  },

  // Make sure values below matches any of the keys in `fontConfig`
  fonts: {
    heading: 'Poppins',
    body: 'Poppins',
    mono: 'Poppins',
  },
  components: {
    Label: {
      baseStyle: ({ colorMode }: { colorMode: ColorMode }) => {
        return {
          color: colorMode === 'dark' ? '#404040' : 'primary.500',
        };
      },
      defaultProps: {
        //size: 'xl',
        fontFamily: 'Poppins-Regular',
      },
    },
    Heading: {
      baseStyle: ({ colorMode }: { colorMode: ColorMode }) => {
        return {
          color: colorMode === 'dark' ? '#404040' : 'primary.500',
        };
      },
      defaultProps: {
        //size: 'xl',
        fontFamily: 'Poppins-Regular',
      },
    },
    // Button: {
    //   _text: {
    //     fontSize: '20',
    //     fontStyle: 'normal',
    //     fontFamily: 'Poppins-ExtraBold',
    //     fontWeight: 600,
    //     color: 'text.900',
    //   },
    //   _dark: {
    //     _text: {
    //       fontSize: '20',
    //       fontStyle: 'normal',
    //       fontFamily: 'Poppins-ExtraBold',
    //       fontWeight: 700,
    //       color: 'text.900',
    //     },
    //   },
    // },
    Text: {
      defaultProps: {
        fontStyle: 'normal',
        fontFamily: 'Poppins-Regular',
      },
    },
    Input: {
      defaultProps: {
        fontStyle: 'normal',
        fontFamily: 'Poppins-Regular',
      },
    },
  },
});

export default theme;
