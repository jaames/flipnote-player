const withSass = require('@zeit/next-sass');

module.exports = withSass({
  exportPathMap: function () {
    return {
      '/': { page: '/' },
      '/view': { page: '/view' },
    }
  },
  webpack: function(config, { isServer }) {
    config.module.rules.push({
      test: /\.svg/,
      exclude: /node_modules/,
      use: '@mapbox/svg-react-transformer-loader'
    });
    return config;
  }
});