module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    no-inline-styles: false
  },
  plugins: ['detox'],
  overrides: [
    {
      files: ['*.e2e.js'],
      env: {
        'detox/detox': true,
        jest: true,
        'jest/globals': true,
      },
    },
  ],
};
