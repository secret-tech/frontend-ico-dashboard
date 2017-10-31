module.exports = {
  plugins: {
    'postcss-use': {
      modules: [
        'postcss-short',
        'postcss-inline-svg',
        'postcss-center',
        'postcss-clearfix'
      ]
    },
    'postcss-cssnext': {},
    'postcss-assets': {
      relative: true
    },
    'postcss-reporter': {
      clearAllMessages: true
    }
  }
};
