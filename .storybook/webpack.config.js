const path = require('path');
const FlowStatusWebpackPlugin = require('flow-status-webpack-plugin');

module.exports = {
  module: {
    rules: [
      { test: /\.hbs/, loader: "handlebars-loader" },
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"],
        include: path.resolve(__dirname, '../')
      }
    ]
  },
  plugins: [
    new FlowStatusWebpackPlugin({
      binaryPath: 'node_modules/.bin/flow',
      onSuccess: console.log,
      onError: console.error
    })
  ]
};