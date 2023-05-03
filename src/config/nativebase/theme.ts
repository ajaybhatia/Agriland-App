import type { ColorMode } from 'native-base';
import { extendTheme } from 'native-base';

const theme = extendTheme({
  fontConfig: {
    Poppins: {
      100: {
        normal: 'Poppins-Thin',
        italic: 'Poppins-ThinItalic',
      },
      200: {
        normal: 'Poppins-Light',
      },

      300: {
        normal: '.Poppins-Black',
      },
      400: {
        normal: 'Poppins-Regular',
      },
      500: {
        normal: 'Poppins-Medium',
      },
      600: {
        normal: 'Poppins-Bold',
      },
      // 700: {
      //   normal: 'Poppins-SemiBold',
      // },
      700: {
        normal: 'Poppins-ExtraBold',
      },
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
