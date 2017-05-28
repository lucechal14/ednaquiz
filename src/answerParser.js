var _ = require('lodash');
var meta = require('./resultsMeta');

module.exports = function (formResponse) {

  var questions = formResponse.definition.fields;
  var answers = formResponse.answers;

  this.getResultsSummary = function () {
    var resultsSummary = {};

    var results = this.parseResults();

    resultsSummary.categoryYesWithCertification = this.categorizeResults(results, function (r) { 
      return r.actualAnswer === 'Sí' && r.actualCertification === 'Certificación';
    });

    resultsSummary.categoryYesWithSelfAppraisal = this.categorizeResults(results, function (r) {
      return r.actualAnswer === 'Sí' && r.actualCertification === 'Autoevaluación';
    });

    resultsSummary.categoryNo = this.categorizeResults(results, function(r){
      return r.actualAnswer === 'No';
    });

    resultsSummary.categoryNA = this.categorizeResults(results, function(r){
      return r.actualAnswer === 'N/A';
    });

    resultsSummary.categoryUnavailable = this.categorizeResults(results, function(r){
      return r.actualAnswer === 'Información No Disponible';
    });

    resultsSummary.email = this.getSingleAnswer('51813999')
    resultsSummary.fullname = this.getSingleAnswer('51813966');
    resultsSummary.companyName = this.getSingleAnswer('51814106');
    resultsSummary.companyProfile = 'Perfil';
    resultsSummary.companyURL = this.getSingleAnswer('51814154');
    resultsSummary.numberEmployees = this.getSingleAnswer('51814417');
    resultsSummary.sector = this.getSingleAnswer('51814471');
    resultsSummary.national = this.getSingleAnswer('51814528');
    resultsSummary.countries = this.getSingleAnswer('51814579');
    resultsSummary.position = this.getSingleAnswer('51813985');
    resultsSummary.city = this.getSingleAnswer('51814010');
    resultsSummary.gender = this.getSingleAnswer('51814058');

    return resultsSummary;
  };

  this.parseResults = function () {

    var getSingleAnswer = this.getSingleAnswer;
    var getTitle = this.getTitleForAnswer;

    return _.map(meta, function (m) {
      m.title = getTitle(m.answer);
      m.actualCertification = getSingleAnswer(m.certification);
      m.actualAnswer = getSingleAnswer(m.answer);
      return m;
    });
  };

  this.getTitleForAnswer = function (definitionId) {
    var targetQuestion = _.find(questions, function (q) {
      return q.id === definitionId;
    });

    return targetQuestion.title;
  }

  this.getSingleAnswer = function (definitionId) {
    var targetAnswer = _.find(answers, function (a) {
      return a.field.id === definitionId;
    });

    try {
      return getAnswerValue(targetAnswer);
    } catch (e) {
      //console.log('Cannot get answer value for ' + definitionId);
      return undefined;
    }
  };

  var getAnswerValue = function (answer) {
    switch (answer.type) {
      case 'boolean':
        return answer.boolean;
      case 'text':
        return answer.text;
      case 'choice':
        return answer.choice.label;
      default:
        return ''
    }
  };

  this.categorizeResults = function (results, evaluation) {
    var categoryResults = _.filter(results, evaluation);

    categoryResults = _.map(categoryResults, function(r){
      return { title: r.title, practice: r.practice };
    });

    return categoryResults;
  };
};