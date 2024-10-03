// Webpack without "babel"
const path = require('path')

module.exports = (env, argv) => {
  return {
    entry: './src/index.js',
    mode: argv.mode === 'production' ? 'production' : 'development',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.js'
    }
  }
}
