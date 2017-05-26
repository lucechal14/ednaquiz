var expect = require('chai').expect;
// var jsonLoader = require('../src/jsonLoader');
// var AnswerParser = require('../src/answerParser');
var persists = require('../src/persists')

describe('Persists', function () {

    it('Saves to file', function () {
        var object = {
            name: 'Object saving test',
            multiples: [
                {title: 'One'},
                {title: 'Two'}
            ]
        };

        // var postObj = jsonLoader('actual_form_response.json');
        // var formResponse = postObj.form_response;
        // var parser = new AnswerParser(formResponse);

        // object = parser.getResultsSummary();

        persists.saveToFile(object);
    });
});