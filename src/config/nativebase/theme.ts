import { extendTheme } from 'native-base';

const theme = extendTheme({
  fontConfig: {
    Roboto: {
      100: {
        normal: '../../../assets/fonts/Poppins-Thin.ttf',
      },
      200: {
        normal: '../../../assets/fonts/Poppins-Black.ttf',
      },
      300: {
        normal: '../../../assets/fonts/Poppins-Regular.ttf',
      },
      400: {
        normal: '../../../assets/fonts/Poppins-Medium.ttf',
      },
      500: {
        normal: '../../../assets/fonts/Poppins-Bold.ttf',
      },
      600: {
        normal: '../../../assets/fonts/Poppins-SemiBold.ttf',
      },
      700: {
        normal: '../../../assets/fonts/Poppins-ExtraBold.ttf',
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
    heading: 'Roboto',
    body: 'Roboto',
    mono: 'Roboto',
  },
  components: {
    Button: {
      baseStyle: {
        _text: {
          fontWeight: 'bold',
        },
      },
    },
  },
});

export default theme;
