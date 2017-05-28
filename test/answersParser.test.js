var jsonLoader = require('../src/jsonLoader');
var AnswerParser = require('../src/answerParser');
var expect = require('chai').expect;

describe('Parsing Tests', function () {

    it('Get results summary', function () {

        var postObj = jsonLoader('actual_form_response.json');
        var formResponse = postObj.form_response;
        var parser = new AnswerParser(formResponse);

        var resultsSummary = parser.getResultsSummary();
        
        expect(resultsSummary.email).to.not.be.empty;
        expect(resultsSummary.fullname).to.not.be.empty;
        expect(resultsSummary.categoryYesWithCertification).to.have.lengthOf(10);
        expect(resultsSummary.categoryYesWithSelfAppraisal).to.have.lengthOf(10);
        expect(resultsSummary.categoryNo).to.have.lengthOf(10);
        expect(resultsSummary.categoryNA).to.have.lengthOf(10);
        expect(resultsSummary.categoryUnavailable).to.have.lengthOf(29);

        var practicesByCategoryTotal = resultsSummary.categoryYesWithCertification.length +
            resultsSummary.categoryYesWithSelfAppraisal.length +
            resultsSummary.categoryNo.length +
            resultsSummary.categoryNA.length +
            resultsSummary.categoryUnavailable.length;
        expect(practicesByCategoryTotal).to.equal(69);
    });
});