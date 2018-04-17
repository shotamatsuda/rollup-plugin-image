// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import buble from 'rollup-plugin-buble'

export default {
  input: 'index.module.js',
  plugins: [
    buble()
  ],
  external: [
    'fs',
    'path',
    'rollup-pluginutils'
  ],
  output: [
    {
      format: 'cjs',
      file: 'index.js'
    }
  ]
}
