module.exports = {
  entry: './javascripts/squares.js',
  output: {
    path: './javascripts',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: require.resolve('createjs-easeljs'),
        loader: 'imports?this=>window!exports?window.createjs'
      },
      {
        test: [/\.js?$/],
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js']
  }
};
