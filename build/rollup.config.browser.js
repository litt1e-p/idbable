import base from './rollup.config.base'

const config = Object.assign({}, base, {
  output: {
    exports: 'named',
    name: `${process.env.npm_package_config_libName}`,
    file: `dist/${process.env.npm_package_config_libName}.min.js`,
    format: 'iife'
  },
})

export default config
