var version = require('./package.json').version;

module.exports = {
  envs: {
    __VERSION__: version
  },
  plugins: [
    {
      resolve: '@poi/plugin-typescript',
      options: {}
    }
  ],
  chainWebpack(config) {
    // remove the old svg loader
    config.module.rules.delete('svg')
    // add react svg loader
    config.module.rule('svg')
      .test(/\.(svg)(\?.*)?$/)
      .use()
        .loader('@mapbox/svg-react-transformer-loader')
        .options({
          svgoPlugins: [
            { collapseGroups: true },
            { convertPathData: true },
            { convertStyleToAttrs: true },
            { removeDoctype: true },
            { removeComments: true },
            { removeXMLNS: true },
            { removeDimensions: true },
          ]
        });
  }
}