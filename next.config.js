const withSass = require('@zeit/next-sass');

module.exports = withSass({
  exportPathMap: function () {
    return {
      '/': { page: '/' },
      '/view': { page: '/view' },
    }
  },
  webpack: function(config, { isServer }) {
    
  }
});