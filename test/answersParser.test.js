var jsonLoader = require('../src/jsonLoader');
var AnswerParser = require('../src/answerParser');
var expect = require('chai').expect;

describe('Parsing Tests', function() {
    var parser;
    before(function() {
        var postObj = jsonLoader('actual_form_response.json');
        var formResponse = postObj.form_response;
        parser = new AnswerParser(formResponse);
    });

    it('Gets single answer by fieldId', function() {
        // expect(parser.getSingleAnswer('51004122')).to.equal(true);
        // expect(parser.getSingleAnswer('51004236')).to.equal('Nada');
        // expect(parser.getSingleAnswer('51004141')).to.equal('Somethung');
    });

    it('Get results summary', function() {

        var resultsSummary = parser.getResultsSummary();
        // expect(resultsSummary).to.have.property('email');
        console.log(resultsSummary);
    });
});