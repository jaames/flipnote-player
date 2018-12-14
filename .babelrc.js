// https://github.com/zeit/next.js/tree/master/examples/with-universal-configuration

const env = require('./env.js');

module.exports = {
  presets: ['next/babel'],
  plugins: [
    'inline-react-svg',
    ['transform-define', env],
  ]
}
