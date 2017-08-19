const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const { webpackDefinePlugin, webpackCommonsChunkPlugin, webpackExtractPcss, webpackExtractAntd, webpackHtmlPlugin, webpackHtmlPlugins, webpackContextReplacementPlugin } = require('./webpack.plugins')
const { htmlLoader, markdownLoader, pcssLoader, jsLoader, imageLoader, fontLoader, cssLoader, antdCssLoader } = require('./webpack.loaders')
const { version, title } = require('./config')()
const paths = require('./paths')

// console.log(paths)
// console.log('output', path.resolve(paths.appBuild, `dist/${process.env.NODE_ENV === 'production' ? version : ''}`))
// return

module.exports = function () {
  console.log('\n  The process.env.NODE_ENV is: ', chalk.cyan.bold(process.env.NODE_ENV), '\n')

  return {
    // context: paths.appIndexJs,
    entry: {
      // author: '../template/author.js',
      index: (process.env.NODE_ENV === 'development')
        ? ['react-hot-loader/patch', 'webpack-hot-middleware/client', paths.appIndexJs]
        : [paths.appIndexJs],
      // vendorReact: ['react', 'react-dom', 'redux-thunk', 'react-router-redux', 'react-router-dom', 'react-redux'],
      // ajax: './app/util/ajax.js'
    },
    output: {
      path: path.resolve(paths.appBuild, `dist/${process.env.NODE_ENV === 'production' ? version : ''}`),
      filename: 'static/[name].js',
      chunkFilename: `static/[name]-[id]${(process.env.NODE_ENV === 'production') ? '.[chunkhash:6]' : ''}.js`,
    },
    resolve: {
      // extensions: [".jsx", ".js"],
      alias: {
        // '~': path.resolve(__dirname, '../app'),
        // jquery: "jquery/dist/jquery" + isMin() + ".js",
        // react: "./node_modules/react/dist/react" + isMin() + ".js",
        // "react-dom": "./node_modules/react-dom/dist/react-dom" + isMin() + ".js",
        // "react-redux": "./node_modules/react-redux/dist/react-redux" + isMin() + ".js",
        // "react-router": "./node_modules/react-router/umd/ReactRouter" + isMin() + ".js",
        // "react-router-redux": "./node_modules/react-router-redux/dist/ReactRouterRedux" + isMin() + ".js",
        // redux: "./node_modules/redux/dist/redux" + isMin() + ".js",
        // reqwest: "./node_modules/reqwest/reqwest" + (process.env.NODE_ENV === 'production') ? '.min' : '' + ".js",
      }
    },
    module: {
      rules: [
        htmlLoader,
        pcssLoader,
        cssLoader,
        antdCssLoader,
        jsLoader,
        fontLoader,
        imageLoader,
        markdownLoader,
      ],
    },
    plugins: [
      webpackExtractPcss,
      webpackExtractAntd,
      webpackDefinePlugin,
      webpackContextReplacementPlugin,
      // webpackHtmlPlugin,
      webpackCommonsChunkPlugin[1],
      webpackCommonsChunkPlugin[2],
      webpackCommonsChunkPlugin[3],
    ].concat(webpackHtmlPlugins)
  }
}