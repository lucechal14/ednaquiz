var jsonLoader = require('../src/jsonLoader');

var expect = require('chai').expect;
var transformViewModel = require('../src/transformViewModel');

describe('Transforms', function () {

    it('Transforms to viewmodel', function () {

        var dbEntry = jsonLoader('herokuDbEntry.json');

        var viewModel = transformViewModel(dbEntry);

        expect(viewModel).to.have.property('categoryYesWithCertification');
        expect(viewModel).to.have.property('categoryYesWithSelfAppraisal');
        expect(viewModel).to.have.property('categoryNo');
        expect(viewModel).to.have.property('categoryNA');
        expect(viewModel).to.have.property('categoryUnavailable');

        expect(viewModel.categoryYesWithCertification).to.be.a('array');

        var firstElement = viewModel.categoryYesWithCertification[0];
        expect(firstElement.goalImageClass).to.be.a('string');
        expect(firstElement.goalName).to.be.a('string');
        expect(firstElement.questions).to.be.a('array');
    });
});