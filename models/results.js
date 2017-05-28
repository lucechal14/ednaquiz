var mongoose = require('mongoose');

var resultsSchema = new mongoose.Schema({
    categoryYesWithCertification: Array,
    categoryYesWithSelfAppraisal: Array,
    categoryNo: Array,
    categoryNA: Array,
    categoryUnavailable: Array,
    email: String,
    fullname: String,

    companyName: String,
    companyProfile: String,
    companyURL: String,
    numberEmployees: String,
    sector: String,
    national: String,
    countries: String,
    position: String,
    city: String,
    gender: String,
});

module.exports = mongoose.model('Results', resultsSchema);