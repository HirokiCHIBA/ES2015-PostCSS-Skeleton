import path from 'path';
import BowerWebpackPlugin from 'bower-webpack-plugin';

// Output path
const dest = './build';
// Source path
const src = './src';
// Relative path
const relativeSrcPath = path.relative('.', src);

export const webpack = {
  entry: `${src}/js/app.js`,
  output: {
    path: __dirname,
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js'],
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          presets: ['es2015'],
        },
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader',
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'url-loader',
      },
    ],
  },
  plugins: [new BowerWebpackPlugin()],
  postcss: wpack => [
    require('postcss-import')({ addDependencyTo: wpack }),  // eslint-disable-line global-require
    require('postcss-nested'),                              // eslint-disable-line global-require
    require('postcss-simple-vars'),                         // eslint-disable-line global-require
    require('precss'),                                      // eslint-disable-line global-require
    require('autoprefixer'),                                // eslint-disable-line global-require
    require('cssnano'),                                     // eslint-disable-line global-require
  ],
};

export const copy = {
  src: [
    `${src}/www/index.html`,
  ],
  dest,
};

export const watch = {
  js: `${relativeSrcPath}/js/**`,
  css: `${relativeSrcPath}/css/**`,
  www: `${relativeSrcPath}/www/index.html`,
};

export default {
  dest,
  js: {
    src: `${src}/js/**`,
    dest: `${dest}/js`,
    uglify: false,
  },
  webpack,
  copy,
  watch,
};
