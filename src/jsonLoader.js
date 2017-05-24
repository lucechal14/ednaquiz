var fs = require('fs');
var parseJson = require('parse-json');
var path = require('path');

module.exports = function(examplesJsonFileName) {
  var jsonPath = path.join(__dirname, '..', 'examples', examplesJsonFileName);
  var rawData = fs.readFileSync( jsonPath, {encoding: 'UTF-8'});
  return parseJson(rawData);
};