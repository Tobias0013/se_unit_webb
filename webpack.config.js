const HtmlWebPackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack');

module.exports = {
  devServer: {
    historyApiFallback: true,
    hot: true,
  port: 8080,
  },
  output: {
    publicPath: "/"
  },
  entry: "./client",
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./client/index.html",
      filename: "./index.html",
    }),
    new Dotenv({
      systemvars: true, // explicitly load system variables
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  }
};
