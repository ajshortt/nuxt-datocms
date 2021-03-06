import { Module } from '@nuxt/types'
const path = require('path')

export interface ModuleOptions {}

const CONFIG_KEY = 'nuxt-datocms'

const nuxtModule: Module<ModuleOptions> = function (moduleOptions) {
  const options = {
    ...this.options['nuxt-datocms'],
    ...moduleOptions
  }

  const runtimeDir = path.resolve(__dirname, 'runtime')
  this.nuxt.options.alias['~nuxt-datocms'] = runtimeDir
  this.nuxt.options.build.transpile.push(runtimeDir)

  this.addPlugin({
    src: path.resolve(runtimeDir, 'plugin.js'),
    fileName: 'nuxt-datocms.js',
    options,
  })
}

;(nuxtModule as any).meta = require('../package.json')

declare module '@nuxt/types' {
  interface NuxtConfig {
    [CONFIG_KEY]: ModuleOptions
  } // Nuxt 2.14+
  interface Configuration {
    [CONFIG_KEY]: ModuleOptions
  } // Nuxt 2.9 - 2.13
  interface Context {
    ['$cms']: {}
  }
}

export default nuxtModule
