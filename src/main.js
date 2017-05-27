var jsonLoader = require('../src/jsonLoader');
var AnswerParser = require('../src/answerParser');
var persists = require('../src/persists');

module.exports = {
    run: function(postObj) {
        var formResponse = postObj.form_response;
        var parser = new AnswerParser(formResponse);
        persists.saveToMongo(parser.getResultsSummary());
    }
};