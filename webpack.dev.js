const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10 * 1024, // 图片小10k就变成base64，否则提取出来
            },
          }
        ],
      },
    ],
  },

  devServer: {
    port: 8080,
    historyApiFallback: true, // 在history路由的情况下，访问各种url都去访问index.html
    compress: true,
    publicPath: '/',
    contentBase: './build/',
  },
});
