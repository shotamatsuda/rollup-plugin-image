// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import { createFilter } from 'rollup-pluginutils'
import { extname } from 'path'
import { readFileSync } from 'fs'

const mimeTypes = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif'
}

export default function image (options = {}) {
  const filter = createFilter(options.include, options.exclude)

  return {
    name: 'image',

    transform (code, id) {
      if (!filter(id)) {
        return null
      }
      const mimes = Object.assign({}, mimeTypes, options.mimeTypes)
      const mime = mimes[extname(id)]
      if (mime === undefined) {
        return null
      }
      const data = readFileSync(id, 'base64')
      const transformedCode = `export default 'data:${mime};base64,${data}';`
      return {
        code: transformedCode,
        map: { mappings: '' }
      }
    }
  }
}
