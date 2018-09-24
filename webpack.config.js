const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode:'production',
  entry:{
    index: './src/index.js',

    server: './sw-push.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js'
  },


  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({ template: 'src/index.html' }),
    new HtmlWebpackPlugin({
      title: 'Workers Test',
      template: 'workers-test.html',
      filename:'sw.html'
    }),
    new HtmlWebpackPlugin({
      title: 'My App',
      template: 'wsj.html',
      filename:'wsj.html'
    }),
    new HtmlWebpackPlugin({
      title: 'My App',
      template: './src/safety.html',
      filename:'safety.html'
    }),
    new CopyWebpackPlugin([
      {
        from: './node_modules/reveal.js/plugin/',
        to: 'plugin/'
      }
    ]),
    new CopyWebpackPlugin([
      {
        from: './src/images/',
        to: 'images/'
      }
    ]),
    new CopyWebpackPlugin([
      {
        from: './workers-test/',
        to: 'workers-test/'
      }
    ]),
    new CopyWebpackPlugin([
      {
        from: './wa-push.js',
        to: 'wa-push.js'
      }
    ]),
    new CopyWebpackPlugin([
      {
        from: './sw-push.js',
        to: 'sw-push.js'
      }
    ]),
    new CopyWebpackPlugin([
      {
        from: './sw-offline.js',
        to: 'sw-offline.js'
      }
    ]),
    new CopyWebpackPlugin([
      {
        from: './sw-cache.js',
        to: 'sw-cache.js'
      }
    ]),
  ],
  module: {
    // loaders: [
    //   {
    //     test: /\.css$/,
    //     loader: "style!css"
    //   },],
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        // loader: "style!css" 
      },
      {
        test: /\.eot(\?\S*)?$/,
        loader: 'url-loader?limit=100000&mimetype=application/vnd.ms-fontobject'
      },
      {
        test: /\.woff2(\?\S*)?$/,
        loader: 'url-loader?limit=100000&mimetype=application/font-woff2'
      },
      {
        test: /\.woff(\?\S*)?$/,
        loader: 'url-loader?limit=100000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?\S*)?$/,
        loader: 'url-loader?limit=100000&mimetype=application/font-ttf'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader"
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=image/svg+xml"
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }
    ]}
}
