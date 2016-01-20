var rucksack = require('rucksack-css')
var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  context: path.join(__dirname, './app'), 
  entry: {
    jsx: './index.jsx',
    html: './index.html',
    vendor: ['react']
  },
  output: {
    path: path.join(__dirname, './static'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      // HTML
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      },
        
      // CSS
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", 'css-loader?sourceMap&importLoaders=1')
      },
      
      // SASS
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },

      //JS
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot',
          'babel-loader'
        ]
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  postcss: [
    rucksack({
      autoprefixer: true
    })
  ],
  plugins: [
    new ExtractTextPlugin("style.css"),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }
    })
  ],
  devServer: {
    contentBase: './app',
    hot: true
  }
}
