const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const env = require('dotenv').config(); // 拿到环境变量

module.exports = {
  entry: './src/single-spa.config.ts',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, /* 'style-loader', */ 'css-loader'],
      },
      {
        test: /\.(scss|sass)$/, // 以什么后缀的文件可以进行处理
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        exclude: /node_modules/, // 排除的文件
      },
      {
        test: /\.(svg|woff|ttf|eot|otf)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10 * 1024,
          },
        },
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
    ],
  },
  node: {
    fs: 'empty',
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    },
    modules: [path.resolve(__dirname, 'node_modules')],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.vue'],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      hash: true,
    }),
    // 忽略掉这个库moment的locale文件夹
    new webpack.IgnorePlugin(/^\.\/locale/, /moment$/),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(env.parsed),
    }),
    // css提取插件，然后写到html中 (使用这个插件要先替换掉style-loader)
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css', // 代码块的文件名 表示是css文件夹下面
      chunkFilename: '[id].css', // 代码块文件名,在异步加载的时候使用的 import('xxx')
    }),
  ],
  optimization: {
    splitChunks: {
      // 代码分割
      cacheGroups: {
        // node_modules下面的代码都放在vendors里面
        vendor: {
          chunks: 'initial', // 指定分割的类型，默认三种 all[全部] async[默认异步] initial[同步]
          name: 'vendors', // 给分割出去的代码块起名字
          test: /node_modules/, // 哪里的代码需要分割
          priority: -10, // 优化优先级
        },
        // 公共代码部分
        // 被2个或以上代码引用的的代码都放在commons里面
        commons: {
          chunks: 'initial',
          name: 'commons',
          minSize: 0, // 最小提取字节
          minChunks: 2, // 最少被几个chunk引用才被提取
          priority: -20, // 优化优先级
        },
      },
    },
  },
};
