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
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: ["@babel/plugin-proposal-class-properties"]
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
