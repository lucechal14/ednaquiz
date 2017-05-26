var fs = require('fs');
var util = require('util');

var persists = {
    saveToFile: function(objectToSave) {
        fs.writeFileSync('./something.txt', util.inspect(objectToSave) , 'utf-8');
    }
}



module.exports = persists;