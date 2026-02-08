module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        alias: {
          '@screens': './app/screens',
          '@components': './app/components',
          '@services': './app/services',
          '@stores': './app/stores',
          '@features': './app/features',
          '@navigations': './app/navigations',
          '@constants': './app/constants',
          '@utils': './app/utils',
        },
      },
    ],
  ],
};
