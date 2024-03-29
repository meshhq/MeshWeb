var rucksack = require('rucksack-css');
var webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var staticPath = path.resolve(__dirname, 'static');
var appPath = path.resolve(__dirname, 'app');
var assetsPath = path.resolve(__dirname, 'app', 'assets');
var imagesPath = path.resolve(assetsPath, 'images');
var staticPath = path.resolve(__dirname, 'public');

// Base plugin set
var buildPlugins = [
  new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
  new webpack.DefinePlugin({
    'process.env': { 
      MODE: JSON.stringify(process.env.MODE),
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      ORIGIN: JSON.stringify(process.env.ORIGIN || 'local')
    }
  }),
  new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
  }),
  new webpack.OldWatchingPlugin()
]

// Production Build Check
if (process.env.NODE_ENV === 'production') {
  buildPlugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    })
  );
} else {
  // If the ENV isn't set to either dev or prod, then set to local
  process.env.NODE_ENV = 'local'
}

module.exports = {
  context: appPath,
  entry: {
    jsx: './index.jsx',
    html: './index.html',
    vendor: ['react']
  },
  output: {
    path: './public/',
    filename: 'bundle.js',
    publicPath: '/'
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
        loaders: ['style-loader', 'css-loader?sourceMap&importLoaders=1']
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

      // JQuery
      { test: require.resolve('jquery'), loader: 'imports?jQuery=jquery' },

      // Assets
      { test: /\.svg$/, loader: 'svg-inline' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?name=[path][name].[ext]&limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },
      { test: /\.jpe?g$|\.gif$|\.png$|\.woff$|\.ttf$|\.wav$|\.mp3$/, loader: 'file-loader?name=[path][name].[ext]' }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: [path.resolve('./app'), path.resolve('./app/assets/bowerComponents'), path.resolve('./app/assets/images')],
    moduleDirectories: [path.resolve('./node_modules'), path.resolve('./app/assets/bowerComponents')],
    alias: {
        jquery: 'jquery/dist/jquery.min.js'
    }
  },
  postcss: [
    rucksack({
      autoprefixer: true
    })
  ],
  plugins: buildPlugins,
  devServer: {
    contentBase: './app',
    historyApiFallback: true,
    hot: true
  },
  sassLoader: {
    includePaths: [assetsPath]
  }
}
