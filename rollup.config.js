import typescript from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { uglify } from 'rollup-plugin-uglify'
import babel from 'rollup-plugin-babel'
import pkg from './package.json'


export default [
  {
    input: 'src/widget/index.ts',
    output: {
      file: 'lib/farmfactory.js',
      format: 'iife',
      name: 'farmFactory',
    },
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
      }),
      uglify(),
    ],
  },
  {
    input: 'src/deployer/index.ts',
    output: {
      file: 'lib/farmdeployer.js',
      format: 'iife',
      name: 'farmDeployer',
    },
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
      }),
      uglify(),
    ],
  },
]
