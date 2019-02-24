var version = require('./package.json').version;

module.exports = {
  envs: {
    __VERSION__: version
  },
  chainWebpack(config) {
    // remove the old svg loader
    config.module.rules.delete('svg')
    // add react svg loader
    config.module.rule('svg')
      .test(/\.(svg)(\?.*)?$/)
      .use()
        .loader('@mapbox/svg-react-transformer-loader')
  }
}