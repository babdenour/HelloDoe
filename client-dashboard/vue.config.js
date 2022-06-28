module.exports = {
  pluginOptions: {
    jestSerializer: {
      formatting: {
        // On doit tout mettre les formatting par défaut sinon, on perd les paramètres par défaut si on écrase une seule valeur.
        indent_char: ' ',
        indent_inner_html: true,
        indent_size: 4,
        inline: [],
        sep: '\n',
        unformatted: ['code', 'pre'],
        wrap_attributes: 'force-aligned',
      },
      removeComments: true,
      stringifyObjects: false,
    },
  },
};
