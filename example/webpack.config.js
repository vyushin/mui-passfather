const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { DefinePlugin } = require('webpack');
const ARGV = process.argv.slice(2);

const SRC_DIR = resolve(__dirname, './src');
const DIST_DIR = resolve(__dirname, './dist');

const IS_PRODUCTION = ARGV[ARGV.findIndex(item => item === '--mode') + 1] === 'production';

module.exports = {
  entry: {
    app: resolve(SRC_DIR, './scripts.tsx'),
    styles: resolve(SRC_DIR, './styles.css'),
  },
  output: {
    filename: '[name].js',
    path: DIST_DIR,
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] },
      }, {
        loader: 'ts-loader',
      }],
    }, {
      test: /\.css$/,
      use: [ MiniCssExtractPlugin.loader, 'css-loader' ],
    }, {
      test: /\.jsx$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: { presets: ['@babel/env', '@babel/react'] },
      }],
    }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(SRC_DIR, './index.html'),
      inject: 'body',
      minify: IS_PRODUCTION,
      hash: true,
      excludeChunks: ['styles']
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      hmr: !IS_PRODUCTION,
    }),
    {
      apply(compiler) {
        compiler.hooks.shouldEmit.tap('Remove styles from output', (compilation) => {
          delete compilation.assets['styles.js'];
          return true;
        })
      }
    }
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      'mui-passfather': resolve(__dirname, '../index.js'),
    },
  },
  devServer: {
    contentBase: DIST_DIR,
    compress: true,
    port: 9000
  }
};