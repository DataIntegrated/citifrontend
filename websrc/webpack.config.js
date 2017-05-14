let path = require("path");

module.exports = env => {
  return {
    entry: "./src/App.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js"
    },
    module: {
      rules: [
        { test: /\.(js|jsx)$/, use: "babel-loader", exclude: /node_modules/ },
        {
          test: /.css$/,
          use: ["style-loader", { loader: "css-loader", query: { url: false } }]
        }
      ]
    },
    devtool: "source-map"
  };
};
