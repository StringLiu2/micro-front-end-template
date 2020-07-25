const path = require('path');
const { merge } = require('webpack-merge');
// js优化压缩插件，存放位置是 optimization 优化
const TerserWebpackPlugin = require('terser-webpack-plugin');
// css优化压缩插件
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const baseConfig = require('./webpack.base');
const copyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: 'none',
  module: {
    // 图片压缩,加载图片前进行压缩
    rules: [
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10 * 1024, // 图片小10k就变成base64，否则提取出来
              // 文件指纹：打包后输出的文件名和后缀,静态文件要变化才能不会缓存之前的图片不刷新,就是hash值
              // 文件描述符的是fs 的 fd方法，和文件指纹没关系
              // name: '[name].[chunkhash]' // 可以配置文件名
              outputPath: 'images', // 输出文件夹 图片输出到images
              publicPath: '/images', // 然后访问添加的路径
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new copyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'assets'), // 打包的静态资源目录地址
          to: './assets', // 打包到dist下面的assets
        },
      ],
    }),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    minimize: true, // 是否要启用
    // 存放优化内容
    minimizer: [
      // 表示放一些优化的插件
      // 压缩js,而且支持es6 (默认production下压缩)
      new TerserWebpackPlugin({
        parallel: true, // 开启多进程并行压缩 (默认没这个)
        cache: true, // 开启缓存,代码没变化就找之前的缓存(默认没这个)
      }),
      // 压缩css的插件
      new OptimizeCssAssetsWebpackPlugin({
        // 不传递就是默认选项
        assetNameRegExp: /\.css$/g, // 指定要压缩模块的正则 (资源文件结尾就压缩)
        // cssnano是PostCss的CSS优化和分解插件，采用格式很好的CSS，并通过许多优化，以确保最终的生产环境尽可能小
        cssProcessor: require('cssnano'),
      }),
    ],
  },
});
