var expect = require('chai').expect;
var jsonLoader = require('../src/jsonLoader');
var Report = require('../src/report');

describe('Report creation', function () {

    it('Creates csv report', function () {

        var dbEntry1 = jsonLoader('dbentry.json');
        var dbEntry2 = jsonLoader('dbentry.json');

        var dbEntries = [dbEntry1, dbEntry2];

        var report = new Report();
        report.generateReport(dbEntries);
    });
});