import typescript from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { uglify } from 'rollup-plugin-uglify'
import babel from 'rollup-plugin-babel'
import pkg from './package.json'


export default {
  input: 'src/index.ts',
  output: {
    file: pkg.main,
    format: 'iife',
    name: 'farmFactory',
  },
  // external: [
  //   ...Object.keys(pkg.dependencies || {}),
  //   ...Object.keys(pkg.peerDependencies || {}),
  // ],
  plugins: [
    json(),
    commonjs(),
    nodeResolve({
      preferBuiltins: false,
    }),
    typescript({
      typescript: require('typescript'),
    }),
    babel({
      runtimeHelpers: true,
      // preferBuiltins: false,
    }),
    // uglify(),
  ],
}
