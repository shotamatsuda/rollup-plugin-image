// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

const buble = require('rollup-plugin-buble')
const chai = require('chai')
const image = require('..')
const rollup = require('rollup')

const expect = chai.expect

process.chdir(__dirname)

function execute (bundle) {
  return bundle.generate({
    format: 'cjs'
  }).then(generated => {
    // eslint-disable-next-line no-new-func
    const fn = new Function('module', 'exports', 'require', generated.code)
    const module = { exports: {} }
    fn(module, module.exports, require)
    return module
  })
}

describe('rollup-plugin-image', () => {
  it('imports image files as base64 strings', () => {
    return rollup.rollup({
      input: 'sample/index.js',
      plugins: [
        image(),
        buble()
      ]
    }).then(execute).then(module => {
      expect(module.exports.jpg).not.undefined
      expect(module.exports.jpg).equal('data:image/jpeg;base64,MAo=')
      expect(module.exports.png).not.undefined
      expect(module.exports.png).equal('data:image/png;base64,MAo=')
    })
  })

  it('supports custom mime types', () => {
    return rollup.rollup({
      input: 'sample/custom.js',
      plugins: [
        image({
          mimeTypes: {
            '.custom': 'image/custom'
          }
        }),
        buble()
      ]
    }).then(execute).then(module => {
      expect(module.exports.jpg).not.undefined
      expect(module.exports.jpg).equal('data:image/jpeg;base64,MAo=')
      expect(module.exports.png).not.undefined
      expect(module.exports.png).equal('data:image/png;base64,MAo=')
      expect(module.exports.custom).not.undefined
      expect(module.exports.custom).equal('data:image/custom;base64,MAo=')
    })
  })
})
