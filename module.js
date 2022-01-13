const { resolve } = require('path')

const moduleName = 'nuxtDatoCms'

const module = function (moduleOptions) {
  const options = {
    ...this.options[moduleName],
    ...moduleOptions,
  }

  const runtimeDir = resolve(__dirname, 'runtime')
  this.nuxt.options.alias[`~${moduleName}`] = runtimeDir
  this.nuxt.options.build.transpile.push(runtimeDir)

  this.addPlugin({
    src: resolve(runtimeDir, 'plugin.js'),
    fileName: `${moduleName}.js`,
    options,
  })
}

export default module
