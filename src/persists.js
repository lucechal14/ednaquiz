var fs = require('fs');
var util = require('util');
var jsonfile = require('jsonfile');
//Import the mongoose module
var mongoose = require('mongoose');
//Set up default mongoose connection

var persists = {
    saveToFile: function(objectToSave) {
        fs.writeFileSync('./debug.txt', util.inspect(objectToSave) , 'utf-8');
    },

    saveJsonToFile: function(objectToSave) {
        var file = './debug.json';
        jsonfile.writeFile(file, objectToSave, function (err) {
            console.error(err);
        });
    },


    saveToMongo: function(resultSummary) {
        
        var newResult = new Results(resultSummary);
        newResult.save();

        Results.find().exec(function(err, result) {
            if(err) throw err;
        });

        //Model.findById()
    }
}



module.exports = persists;