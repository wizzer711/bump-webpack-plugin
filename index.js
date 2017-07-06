var fs = require('fs');
var path = require('path');
var join = path.join;

var Plugin = function(params) {

  this.files = params.files;
  this.version = (params.version != '') ? params.version : 'null';

  this.context = path.dirname(module.parent.filename);

  // allows for a single string entry
  if (typeof params.files == 'string' || params.files instanceof String){
    this.files = [params.files];
  } else {
    this.files = params.files || [];
  }

}

// hook into webpack
Plugin.prototype.apply = function(compiler) {
  var self = this;
  return compiler.plugin('done', function() {
    self.files.forEach(function(file){
      var file = join(self.context, file);
      var json = self.increment(file, self.version);
      fs.writeFile(file, JSON.stringify(json, null, 2), function(err){
        
        if (err) throw err;
      });
    });
  });
}

// increment build number
Plugin.prototype.increment = function(file, version) {
  var json = require(file);
  var versions = json.version.split('.');
  versions[2] = parseInt(versions[2]) + 1;
  json.version = versions.join('.');
  if(version){
    json.version = version;
  }
  return json;
}

module.exports = Plugin;
