const colors = require('./src/ui/theme/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Poppins: [
          'Poppins-Bold',
          'Poppins-Black',
          'Poppins-ExtraBold',
          'Poppins-Thin',
          'Poppins-Medium',
          'Poppins-Regular',
        ],
      },
      colors,
    },
  },
  plugins: [],
};
