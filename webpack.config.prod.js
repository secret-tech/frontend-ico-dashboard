const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const FaviconsPlugin = require('favicons-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Md5HashPlugin = require('webpack-md5-hash');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const entry = [
  'babel-polyfill',
  path.resolve(__dirname, 'src/index')
];

const output = {
  path: path.resolve('dist'),
  publicPath: '/',
  filename: '[name].[chunkhash].js'
};

const devtool = 'cheap-module-source-map';

const resolve = {
  extensions: ['.js', '.jsx', '.json'],
  modules: [
    path.resolve(__dirname, 'src'),
    'node_modules'
  ]
};

const plugins = [
  new Md5HashPlugin(),
  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify('production') }
  }),
  new ExtractTextPlugin({
    filename: '[name].[contenthash].css',
    allChunks: true
  }),
  new HtmlPlugin({
    template: './src/index.html',
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true
    },
    inject: true
  }),
  new CopyPlugin([
    { from: 'src/locales', to: 'locales' },
    { from: 'src/assets/images', to: 'images' }
  ]),
  new FaviconsPlugin('./src/assets/favicon.png'),
  new UglifyJsPlugin()
];

const webpackModule = {
  rules: [
    {
      test: /\.js$/,
      enforce: 'pre',
      include: /src/,
      loader: 'eslint-loader'
    },
    {
      test: /\.js$/,
      include: /src/,
      loader: 'babel-loader'
    },
    {
      test: /\.css$/,
      include: /src/,
      exclude: /src\/assets/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              minimize: true,
              sourceMap: true,
              localIdentName: '[local]__[hash:base64:5]'
            }
          },
          { loader: 'postcss-loader' }
        ]
      })
    },
    {
      test: /\.css$/,
      include: /(src\/assets|node_modules)/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader'
      })
    },
    {
      test: /\.(ttf|otf|eot|svg|woff2?)(\?.+)?$/,
      loader: 'url-loader',
      options: { limit: 10000 }
    },
    {
      test: /\.(jpe?g|png|gif|ico)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]'
      }
    }
  ]
};

module.exports = {
  entry,
  output,
  devtool,
  resolve,
  plugins,
  module: webpackModule
};
