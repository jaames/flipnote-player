// https://github.com/zeit/next.js/tree/master/examples/with-universal-configuration

const prod = process.env.NODE_ENV === 'production'
const version = require('./package.json').version;

module.exports = {
  'process.env.BASE_URL': prod ? 'https://flipnote.rakujira.jp' : 'http://localhost:3000',
  'process.env.VERSION': version
}