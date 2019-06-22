const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./js/Main.jsx",
  output: {
    path: path.resolve(__dirname, "./dist/"),
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "./dist/"),
    hot: true
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {
          presets: ["env", "react"],
          plugins: ["transform-class-properties"]
        }
      },
      {
        test: /.css$/,
        loader: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
