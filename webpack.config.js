const HtmlWebPackPlugin = require("html-webpack-plugin") ;

module.exports = {
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
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./client/index.html",
      filename: "./index.html",
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  }
};
