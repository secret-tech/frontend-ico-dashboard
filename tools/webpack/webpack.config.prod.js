import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import path from 'path';

import config from '../../config.json';

const entry = [
  'babel-polyfill',
  path.resolve(__dirname, '../../src/index')
];
const target = 'web';
const output = {
  path: path.resolve(__dirname, '../../dist'),
  publicPath: '/',
  filename: '[name].[chunkhash].js'
};
const devtool = 'source-map';
const resolve = { extensions: ['*', '.js', '.jsx', '.json'] };

const plugins = [
  new Dotenv({
    path: '.env',
    systemvars: true
  }),
  new WebpackMd5Hash(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
    __DEV__: false,
    CONFIG: JSON.stringify(config)
  }),
  new ExtractTextPlugin('[name].[contenthash].css'),
  new UglifyJsPlugin({ sourceMap: true }),
  new HtmlWebpackPlugin({
    template: 'src/index.html',
    favicon: 'src/assets/favicon.png',
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
  })
];

const rules = [
  {
    test: /\.js?$/,
    exclude: /node_modules/,
    use: ['babel-loader']
  },
  {
    test: /\.css?$/,
    include: /(src\/assets|node_modules)/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: { minimize: true }
        }
      ]
    })
  },
  {
    test: /\.scss?$/,
    include: /src/,
    exclude: /(src\/assets|node_modules)/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 1,
            localIdentName: '[local]__[hash:base64:5]',
            minimize: true,
            sourceMap: true
          }
        },
        {
          loader: 'sass-loader',
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            config: { path: 'tools/postcss.config.js' }
          }
        }
      ]
    })
  },
  {
    test: /\.scss$/, // scss-loader without modules
    include: /(src\/assets|node_modules)/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: ['css-loader', 'sass-loader']
    })
  },
  {
    test: /\.(jpe?g|png|gif|ico)$/i,
    use: [
      {
        loader: 'file-loader',
        options: { name: '[name].[ext]' }
      }
    ]
  },
  {
    test: /\.eot(\?v=\d+.\d+.\d+)?$/,
    use: [
      {
        loader: 'file-loader',
        options: { name: '[name].[ext]' }
      }
    ]
  },
  {
    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    use: [
      {
        loader: 'file-loader',
        options: { name: '[name].[ext]' }
      }
    ]
  },
  {
    test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
    use: [
      {
        loader: 'file-loader',
        options: { name: '[name].[ext]' }
      }
    ]
  },
  {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    use: [
      {
        loader: 'file-loader',
        options: { name: '[name].[ext]' }
      }
    ]
  }
];

export default {
  entry,
  target,
  output,
  devtool,
  resolve,
  plugins,
  module: { rules }
};
