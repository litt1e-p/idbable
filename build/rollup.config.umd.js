import base from './rollup.config.base'

const config = Object.assign({}, base, {
  output: {
    exports: 'named',
    name: `${process.env.npm_package_config_libName}`,
    file: `dist/${process.env.npm_package_config_libName}.umd.js`,
    format: 'umd'
  },
})

export default config
