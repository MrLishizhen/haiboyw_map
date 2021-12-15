var nodeExternals = require('webpack-node-externals');
const path = require('path');
const package = require('./package.json');

const {data} = package;

const publicPathName = 'custom';
const widgetPathName = data.widgetName;


module.exports = {
  entry: './src/production.js',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: `${publicPathName}/${widgetPathName}/[name].js`,
    libraryTarget: "jsonp",
    library: data.widgetName
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
  // externals: [
  //   nodeExternals({
  //     importType: function (moduleName) {
  //       if (moduleName == 'lodash') {
  //         return { amd: moduleName, commonjs: moduleName, commonjs2: moduleName, root: '_' };
  //       } else {
  //         return { amd: moduleName, commonjs: moduleName, commonjs2: moduleName };
  //       }
  //     }
  //   })
  // ],
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
        use:[
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                // hashPrefix: 'my-custom-hash',
              }
            },
          },
          {
            loader: 'less-loader',
            options: {
            }
          }
        ]
      },{
        test: /\.(css|less)$/,
        include: [/node_modules/],
        use:[
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
      }, {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
        use: [
           {
            loader: 'file-loader',
            options: {
              name: `${publicPathName}/${widgetPathName}/assets/img/[name].[hash:8].[ext]`,
            }
          }
        ]
        
      }
    ]
  }
}