const path = require('path');

const { deployOnLocalhost } = require('./config')

const OUTPUT_LOCATION = deployOnLocalhost ? path.join(__dirname, '../backend/public/js') : path.join(__dirname, 'dist');


module.exports = {
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: OUTPUT_LOCATION,
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3001,
    allowedHosts: ['all'],
    host: '0.0.0.0',    
    proxy: {
      context: ['/api', '/auth'],
      target: 'http://localhost:3002'
    },
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            "presets": [
              "@babel/preset-env", 
              "@babel/preset-react"
            ],
            "plugins": [
              ["@babel/plugin-transform-runtime"]
            ],
          }
        }
      },
      {
        test: /\.css$/,
        use: [
            'style-loader',
            'css-loader'
        ]
      }
    ]
  },
};