var expect = require('chai').expect;
var jsonLoader = require('../src/jsonLoader');
var AnswerParser = require('../src/answerParser');
var persists = require('../src/persists')

describe('Persists', function () {
    var parser;

    before(function() {
        var postObj = jsonLoader('actual_form_response.json');
        var formResponse = postObj.form_response;
        parser = new AnswerParser(formResponse);
    })

    it('Saves to file', function () {
        var object = {
            name: 'Object saving test',
            multiples: [
                {title: 'One'},
                {title: 'Two'}
            ]
        };

        // object = parser.getResultsSummary();
        persists.saveToFile(object);
    });

    it('Save to mongo', function() {
        persists.saveToMongo(parser.getResultsSummary());
    });
});