// https://github.com/zeit/next.js/tree/master/examples/with-universal-configuration

const prod = process.env.NODE_ENV === 'production'
// const version = require('./package.json').version;

module.exports = {
  // VERSION: version,
  'process.env.BASE_URL': prod ? 'https://flipnote.rakujira.jp' : 'http://localhost:3000'
}