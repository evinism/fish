module.exports = {
  context: __dirname + "/src",
  entry: [
    'babel-polyfill',
    './index',
  ],
  devServer: {
    disableHostCheck: true,
  },
  output: {
    path: __dirname + "/build",
    filename: "bundle.js",
    publicPath: "/build/"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
      }
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
}
