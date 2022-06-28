const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const BrotliWebpackPlugin = require('brotli-webpack-plugin');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpackBase = require('./webpack.base.js');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const Dotenv = require('dotenv-webpack');

function resolve(dir) {
  return path.join(__dirname, '../', dir);
}

module.exports = () => {
  const isProd = process.env.NODE_ENV === 'production';
  const isCI = process.env.CI_ENV === 'true';
  const runtimeChunkName = 'manifest';

  const config = {
    stats: {
      entrypoints: false, // Pour éviter d'avoir plein de message avec MiniCssExtractPlugin
    },

    mode: !isProd ? 'development' : 'production',

    entry: {
      app: resolve('./src/main.ts'),
    },

    output: {
      path: resolve('dist'),
      publicPath: '/',
      filename: 'js/[name].' + webpackBase.chunkhashToken + '.js',
      chunkFilename: 'js/[name].' + webpackBase.chunkhashToken + '.js',
      libraryTarget: 'window',
    },

    resolve: {
      extensions: webpackBase.resolve.extensions,
      alias: webpackBase.resolve.alias,
    },

    devtool: 'eval-source-map',

    devServer: {
      proxy: {
        '/api': {
          changeOrigin: true,
          target: 'http://localhost:8090',
          onProxyReq: (req) => {
            if (req.getHeader('origin')) {
              req.setHeader('origin', 'http://localhost:8090');
            }
          },
        },
      },
    },

    module: {
      rules: [...(isProd ? webpackBase.module.rulesProd() : webpackBase.module.rulesDev())],
    },

    plugins: [
      ...(isProd ? webpackBase.pluginsProd : webpackBase.pluginsDev),
      new Dotenv({
        path: resolve('.env'),
        systemvars: process.env.CI_ENV === 'true',
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: resolve('index.html'),
        inject: true,
      }),
      new InlineManifestWebpackPlugin(runtimeChunkName),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: resolve('public'),
            to: '',
          },
        ],
      }),
    ],

    optimization: {
      runtimeChunk: {
        name: runtimeChunkName,
      },
      splitChunks: {
        maxInitialRequests: 5,
        minSize: 50000,
        cacheGroups: {
          vendors: false,
          vue: {
            test: /[\\/]node_modules[\\/](vue|vue-router|vuex|vue-class-component|vue-property-decorator)[\\/]/,
            name: 'vue',
            chunks: 'all',
          },
        },
      },
    },
  };

  if (isProd) {
    // To get good stack traces without providing source code
    config.devtool = 'nosources-source-map';

    config.plugins.push(
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: 'css/[name].' + webpackBase.contenthashToken + '.css',
        chunkFilename: 'css/[name].' + webpackBase.contenthashToken + '.css',
        ignoreOrder: true,
      }),
      new CompressionWebpackPlugin({
        test: /\.(js|css|svg)$/,
        cache: false,
      }),
      new BrotliWebpackPlugin({
        test: /\.(js|css|svg)$/,
      })
    );

    config.optimization.minimizer = [
      new TerserPlugin({
        parallel: process.env.TERSER_PARALLEL
          ? parseInt(process.env.TERSER_PARALLEL, 10)
          : require('os').cpus().length - 1,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsWebpackPlugin({
        cssProcessorOptions: {
          map: {
            inline: false,
            annotation: true,
          },
        },
      }),
    ];
  } else {
    config.output.filename = config.output.filename.replace(
      webpackBase.chunkhashToken,
      webpackBase.hashToken
    );
    config.output.chunkFilename = config.output.chunkFilename.replace(
      webpackBase.chunkhashToken,
      webpackBase.hashToken
    );

    // Pour faire fonctionner correctement le déboggage en développement
    config.output.devtoolModuleFilenameTemplate = (info) =>
      'file:///' + path.resolve(info.absoluteResourcePath).replace(/\\/g, '/');
  }

  if (isProd && !isCI) {
    // To generate .gz and .br files
    config.plugins.push(
      new WebpackBundleAnalyzer({
        defaultSizes: 'gzip',
      })
    );
  }

  return config;
};
