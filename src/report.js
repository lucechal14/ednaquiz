var json2csv = require('json2csv');
var fs = require('fs');
var meta = require('../src/resultsMeta');
var _ = require('lodash');

function Reporter() {

    var defaultFields = ['practiceId', 'yesWithCertification', 'yesWithSelfAppraisal', 'no', 'na', 'notAvailable'];
    var columnNames = ['Practica', 'Si con Certificacion', 'Si con Autoevaluacion', 'No', 'NA', 'Informacion No Disponible'];

    this.generateReport = function (dbEntries) {
        var report = createReport(dbEntries);
        printToCSV(report, "report.csv");
    };

    var createReport = function (dbEntries) {
        var report = [];

        var practices = getPractices();

        _.each(practices, function(p){
            var reportEntry = {
                practiceId: p,
                yesWithCertification: 0,
                yesWithSelfAppraisal: 0,
                no: 0,
                na: 0,
                notAvailable: 0
            };

            
            reportEntry.yesWithCertification = _.filter(dbEntries, function(entry) {
                return _.find(entry.categoryYesWithCertification, function (pra) {
                    return pra.practice === p;
                });
            }).length;

            reportEntry.yesWithSelfAppraisal = _.filter(dbEntries, function(entry) {
                return _.find(entry.categoryYesWithSelfAppraisal, function (pra) {
                    return pra.practice === p;
                });
            }).length;
            
            reportEntry.no = _.filter(dbEntries, function(entry) {
                return _.find(entry.categoryNo, function (pra) {
                    return pra.practice === p;
                });
            }).length;

            reportEntry.na = _.filter(dbEntries, function(entry) {
                return _.find(entry.categoryNA, function (pra) {
                    return pra.practice === p;
                });
            }).length;

            reportEntry.notAvailable = _.filter(dbEntries, function(entry) {
                return _.find(entry.categoryUnavailable, function (pra) {
                    return pra.practice === p;
                });
            }).length;

            //console.log('Found for practice ', p, ' is ', reduction.length);

            report.push(reportEntry);
        });

        

        return report;
    }

    var getPractices = function () {
        var result = _.reduce(meta, function(result, value, key){
            if(!result.practices) {
                result.practices = []; 
            }

            result.practices.push(value.practice);
            return result;
        }, {});

        return result.practices;
    }

    var printToCSV = function (report, reportName) {
        var csv = json2csv({ data: report, fields: defaultFields, fieldNames: columnNames });
 
        fs.writeFile(reportName, csv, function(err) {
            if (err) throw err;
            console.log('file saved');
        });
    }
}

module.exports = Reporter;