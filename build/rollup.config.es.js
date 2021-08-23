import base from './rollup.config.base'

const config = Object.assign({}, base, {
  output: {
    name: `${process.env.npm_package_config_libName}`,
    file: `dist/${process.env.npm_package_config_libName}.esm.js`,
    format: 'es',
  },
})

export default config
