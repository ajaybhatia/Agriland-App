import { extendTheme } from 'native-base';

const theme = extendTheme({
  fontConfig: {
    Roboto: {
      100: {
        normal: '../../../assets/fonts/Italianno-Regular.ttf'
      },
      200: {
        normal: '../../../assets/fonts/Italianno-Regular.ttf'
      },
      300: {
        normal: '../../../assets/fonts/Italianno-Regular.ttf'
      },
      400: {
        normal: '../../../assets/fonts/Italianno-Regular.ttf'
      },
      500: {
        normal: '../../../assets/fonts/Italianno-Regular.ttf'
      },
      600: {
        normal: '../../../assets/fonts/Italianno-Regular.ttf'
      }
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
    }
  },

  // Make sure values below matches any of the keys in `fontConfig`
  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
    mono: 'Roboto'
  },
  components: {
    Button: {
      baseStyle: {
        _text: {
          fontWeight: 'bold'
        }
      }
    }
  }
});

export default theme;
