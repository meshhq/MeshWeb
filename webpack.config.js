var rucksack = require('rucksack-css');
var webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var staticPath = path.resolve(__dirname, 'static');
var appPath = path.resolve(__dirname, 'app');
var assetsPath = path.resolve(__dirname, 'app', 'assets');

// Production Build Check
if (process.env.NODE_ENV == 'production') {
  staticPath = path.resolve(__dirname, 'public', 'static');
}

module.exports = {
  context: appPath, 
  entry: {
    jsx: './index.jsx',
    html: './index.html',
    vendor: ['react']
  },
  output: {
    path: staticPath,
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
        loaders: ["style-loader", 'css-loader?sourceMap&importLoaders=1']
      },
      
      // SASS
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },

      //JS
      {
        test: /\.(js|jsx)$/,
        exclude: nodeModulesPath,
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
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    })
  ],
  devServer: {
    contentBase: './app',
    hot: true
  },
  sassLoader: {
    includePaths: [assetsPath]
  }
}
