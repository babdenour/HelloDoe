const path = require('path');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function resolve(dir) {
  return path.join(__dirname, '../', dir);
}

const chunkhashToken = '[chunkhash:20]';
const hashToken = '[hash:20]';
const contenthashToken = '[contenthash:20]';

const moduleRulesBase = (isProd) => [
  {
    test: /\.vue$/,
    loader: 'vue-loader',
  },
  {
    test: /\.js$/,
    use: ['source-map-loader'],
    enforce: 'pre',
  },
  {
    enforce: 'post',
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
  },
  {
    enforce: 'post',
    test: /\.scss$/,
    use: [
      !isProd
        ? 'style-loader'
        : { loader: MiniCssExtractPlugin.loader, options: { publicPath: '../' } },
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          plugins: function () {
            return [require('autoprefixer')];
          },
        },
      },
    ],
  },
  {
    enforce: 'pre',
    test: /\.scss$/,
    loader: 'sass-loader',
    options: {
      sourceMap: true,
      includePaths: [resolve('src/styles')],
    },
  },
  {
    test: /\.html$/,
    loader: 'vue-template-loader',
    exclude: resolve('index.html'),
    options: {
      scoped: true,
    },
  },
  {
    test: /\.ts$/,
    use: [
      {
        loader: 'thread-loader',
        options: {
          workers: process.env.THREAD_LOADER_WORKERS_TS
            ? parseInt(process.env.THREAD_LOADER_WORKERS_TS, 10)
            : require('os').cpus().length - 1,
        },
      },
      {
        loader: 'ts-loader',
        options: {
          configFile: resolve('tsconfig.build.json'),
          happyPackMode: true,
        },
      },
    ],
  },
  {
    test: /\.svg$/,
    oneOf: [
      {
        oneOf: [
          {
            loader: 'svg-inline-loader', // Pour les svg légers
            options: {
              removeTags: true,
              removingTags: ['desc', 'defs', 'style'],
              removeSVGTagAttrs: true,
            },
          },
          {
            loader: 'url-loader', // Pour les svg non inline
            options: {
              limit: false, //Tout externaliser les svg non inclus dans les exclus du loader svg-inline-loader
              name: 'img/[name].' + hashToken + '.[ext]',
              esModule: false,
            },
          },
        ],
      },
      {
        loader: 'url-loader', // Pour les sprites
        options: {
          limit: false, // Un xlink:href avec data:image embeded ne fonctionne pas sous edge. On doit tout externaliser les sprites.
          name: 'img/[name].' + hashToken + '.[ext]',
          publicPath: (url) => '/' + url, // Un xlink:href ne peut fonctionner avec un href sur un autre domaine. Il faut donc forcer le chargement sur le serveur courant et non pas sur le CDN.
          esModule: false,
        },
      },
    ],
  },
  {
    test: /\.(png|jpe?g|gif)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 5000,
      name: 'img/[name].' + hashToken + '.[ext]',
      esModule: false,
    },
  },
  {
    test: /\.mp4$/,
    use: 'file-loader?name=videos/[name].[ext]',
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    query: {
      limit: 5000,
      name: 'fonts/[name].' + hashToken + '.[ext]',
      esModule: false,
    },
  },
];

const pluginsBase = () => [];

module.exports = {
  resolve: {
    extensions: ['.js', '.ts', '.html', '.vue'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@api': resolve('src/api'),
      '@assets': resolve('src/assets'),
      '@constants': resolve('src/constants'),
      '@converters': resolve('src/converters'),
      '@domains': resolve('src/domains'),
      '@factories': resolve('src/factories'),
      '@libs': resolve('src/libs'),
      '@admin': resolve('src/modules/admin'),
      '@components': resolve('src/modules/components'),
      '@client': resolve('src/modules/client'),
      '@public': resolve('src/modules/public'),
      '@modules': resolve('src/modules'),
      '@services': resolve('src/services'),
      '@store': resolve('src/store'),
      '@': resolve('src'),
    },
  },
  module: {
    rulesDev: () => [
      {
        // Linter localement et non sur jenkins car il y a déjà un stage de lintage
        enforce: 'pre',
        test: /\.html$/,
        loader: 'htmlhint-loader',
        include: resolve('src'),
        exclude: resolve('index.html'),
        options: {
          configFile: resolve('.htmlhintrc'),
          emitAs: 'error',
          failOnError: true,
        },
      },
      ...moduleRulesBase(false),
    ],
    rulesProd: () => [...moduleRulesBase(true)],
  },
  pluginsDev: [
    // Linter localement et non sur jenkins car il y a déjà un stage de lintage
    new StyleLintPlugin({
      configFile: resolve('.stylelintrc.json'),
      emitError: true,
      lintDirtyModulesOnly: true,
    }),
    ...pluginsBase(false),
  ],
  pluginsProd: [...pluginsBase(true)],
  chunkhashToken,
  hashToken,
  contenthashToken,
};
