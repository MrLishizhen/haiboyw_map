const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const publicPathName = 'static';
const outPutPathName = 'js';
const outResoucePathName = 'js';

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 7001;
const HOST = process.env.HOST || 'localhost';

module.exports = {
  entry: './src/index.js',
  // entry: './src/StandardTab/index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: `${publicPathName}/${outPutPathName}/[name].js`,
    // chunkFilename: "[name].min.js"
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
  stats: {
    children: false
  },
  devServer: {
    contentBase: './',
    host: HOST,
    port: DEFAULT_PORT,
    hot: true,
    inline: true,//实时刷新
    compress: true,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      }, {
        test: /\.(css|less)$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                hashPrefix: 'my-custom-hash',
              }
            },
          },
          {
            loader: 'less-loader',
            options: {
            }
          }
        ]
      }, {
        test: /\.(css|less)$/,
        include: [/node_modules/],
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'less-loader',
            options: {
            }
          }
        ]
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: `${publicPathName}/${outResoucePathName}/[name].[hash:8].[ext]`,
            }
          }
        ]

      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Development',
      filename: 'index.html',
      template: resolveApp('public/index.html'),
      inject: true
    })
  ],
  devServer: {
    hot: true,
    open: true,
    proxy: {
      '/sign': {
        'target': 'http://10.0.0.105:5475',
        'changeOrigin': true,
        'ws': true
      }
    }
  }
}