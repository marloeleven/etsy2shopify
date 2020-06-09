const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'css-loader',
          'to-string-loader',
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new UglifyJsPlugin(),
    new HtmlWebpackPlugin({template: './index.html'}),
  ],
  mode: 'development',
};