var jsonLoader = require('../src/jsonLoader');
var AnswerParser = require('../src/answerParser');

describe('Parsing Tests', function() {
    it('Retrieves data as json', function() {
        
        var postObj = jsonLoader('typeform_webhook_response.json');
        
        var formResponse = postObj.form_response;
        
        var parser = new AnswerParser(formResponse);
        console.log(parser.getSingleAnswer('whatever'));
    });
});