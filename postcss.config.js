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
    'doiuse': {
      browsers: ['ie >= 10', '> 5%']
    },
    'postcss-reporter': {
      clearAllMessages: true
    }
  }
}