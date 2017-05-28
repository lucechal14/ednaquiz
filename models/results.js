var mongoose = require('mongoose');

var resultsSchema = new mongoose.Schema({
    categoryYesWithCertification: Array,
    categoryYesWithSelfAppraisal: Array,
    categoryNo: Array,
    categoryNA: Array,
    categoryUnavailable: Array,
    email: String,
    fullname: String
});

module.exports = mongoose.model('Results', resultsSchema);