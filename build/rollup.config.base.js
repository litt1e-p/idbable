import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/index.js',
  plugins: [
    resolve({ extensions: ['.vue'] }),
    commonjs(),
    babel({
      // exclude: 'node_modules/**',
      sourceMap: false,
      extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.vue']
    }),
    terser()
  ]
}
