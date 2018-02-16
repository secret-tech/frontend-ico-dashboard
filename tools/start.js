import browserSync from 'browser-sync';
import connectHistoryApiFallback from 'connect-history-api-fallback';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from './webpack/webpack.config.dev';

const bundler = webpack(config);

browserSync({
  port: 3000,
  ui: { port: 3001 },
  server: {
    baseDir: 'src',
    middleware: [
      connectHistoryApiFallback(),
      webpackDevMiddleware(bundler, {
        publicPath: config.output.publicPath,
        noInfo: true,
        quiet: false,
        stats: {
          assets: false,
          colors: true,
          version: false,
          hash: false,
          timings: false,
          chunks: false,
          chunkModules: false
        }
      }),
      webpackHotMiddleware(bundler)
    ]
  },
  files: [
    'src/*.html'
  ]
});
