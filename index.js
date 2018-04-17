'use strict';

var rollupPluginutils = require('rollup-pluginutils');
var path = require('path');
var fs = require('fs');

//

var mimeTypes = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif'
};

function image (options) {
  if ( options === void 0 ) options = {};

  var filter = rollupPluginutils.createFilter(options.include, options.exclude);

  return {
    name: 'image',

    transform: function transform (code, id) {
      if (!filter(id)) {
        return null
      }
      var mimes = Object.assign({}, mimeTypes, options.mimeTypes);
      var mime = mimes[path.extname(id)];
      if (mime === undefined) {
        return null
      }
      var data = fs.readFileSync(id, 'base64');
      var transformedCode = "export default 'data:" + mime + ";base64," + data + "';";
      return {
        code: transformedCode,
        map: { mappings: '' }
      }
    }
  }
}

module.exports = image;
