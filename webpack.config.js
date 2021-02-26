const webpack = require('webpack')
const dotenv = require('dotenv')
const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const rootDir = path.resolve(__dirname, '.')
const distDir = path.resolve(__dirname, '.', 'dist')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const devMode = process.env.NODE_ENV !== 'production'
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')

module.exports = () => {
  const env = dotenv.config().parsed
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next])
    return prev
  }, {})
  return {
    context: rootDir,
    entry: './src/index.js',
    output: {
      path: distDir,
      publicPath: '/',
      filename: '[hash].js'
    },
    devServer: {
      contentBase: rootDir,
      publicPath: '/',
      historyApiFallback: true,
      // hot: true,
      open: true,
      inline: false
      // needed for phone testing
      // host:'0.0.0.0',
      // port:'8080'
    },
    devtool: 'cheap-module-source-map',
    resolve: {
      extensions: ['*', '.js', '.jsx'],
      alias: {
        Styles: path.resolve(__dirname, 'src/styles/'),
        Assets: path.resolve(__dirname, 'src/assets/'),
        Redux: path.resolve(__dirname, 'src/redux/'),
        Views: path.resolve(__dirname, 'src/views/'),
        Hoc: path.resolve(__dirname, 'src/hoc/'),
        Routes: path.resolve(__dirname, 'src/routes/'),
        FormConstants: path.resolve(__dirname, 'src/FormConstants/'),
        Util: path.resolve(__dirname, 'src/util/')
      }
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader', 'eslint-loader'], // include eslint-loader,
          include: path.resolve(__dirname, './', 'src')
        },
        {
          test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|otf|svg)(\?[a-z0-9=.]+)?$/,
          loader: 'url-loader'
        },
        {
          test: /\.s?[ac]ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { url: false, sourceMap: true } },
            { loader: 'sass-loader', options: { sourceMap: true } }
          ]
        }
      ]
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserJSPlugin({}),
        new OptimizeCSSAssetsPlugin({
          cssProcessor: require('cssnano'),
          cssProcessorOptions: {
            discardComments: {
              removeAll: true
            },
            safe: true
          },
          canPrint: false
        })
      ],
      splitChunks: {
        minSize: 30000,
        maxSize: 0,
        minChunks: 1,
        automaticNameDelimiter: '~',
        name: 'osiris',
        cacheGroups: {
          default: false,
          vendors: {
            chunks: 'all',
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          },
          common: {
            chunks: 'async',
            minChunks: 2,
            name: 'common',
            priority: -20,
            reuseExistingChunk: true
          }
        }
      }
    },
    plugins: [
      new HtmlWebPackPlugin({
        // where to find the html template
        template: path.resolve(__dirname, 'index.html'),
        // where to put the generated file
        path: distDir,
        // the output file name
        filename: 'index.html',
        files: {
          css: ['styles.css'],
          js: ['bundle.js']
        }
      }),
      new MiniCssExtractPlugin({
        filename: '[hash].css'
      }),
      new webpack.DefinePlugin(envKeys)
    ],
    mode: devMode ? 'development' : 'production'
  }
}
