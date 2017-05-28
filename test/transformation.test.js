var expect = require('chai').expect;
var jsonLoader = require('../src/jsonLoader');
var Report = require('../src/report');
var transform = require('../src/transformViewModel');

describe('Transformation', function () {

    it('transforms results into view model', function () {

        var results = jsonLoader('herokuDbEntry.json');
    
        var viewModel = transform(results);

        console.log(viewModel);
    });
});