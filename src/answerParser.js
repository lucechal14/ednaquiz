var _ = require('lodash');
var meta = require('./resultsMeta');

module.exports = function (formResponse) {

  var questions = formResponse.definition.fields;
  var answers = formResponse.answers;

  this.parseResults = function () {

    var getSingleAnswer = this.getSingleAnswer;
    var getTitle = this.getTitleForAnswer;

    return _.map(meta, function (m) {
      m.title = getTitle(m.answer);
      m.certification = getSingleAnswer(m.certification);
      m.answer = getSingleAnswer(m.answer);
      return m;
    });
  };

  this.getResultsSummary = function () {
    var resultsSummary = {};

    var results = this.parseResults();

    resultsSummary.categoryYesWithCertification = _.filter(results, function (r) {
      if(r.answer === 'Sí' && r.certification === 'Certificación') {
        return true;
      }

      return false;
    });

    resultsSummary.categoryYesWithSelfAppraisal = _.filter(results, function (r) {
      if(r.answer === 'Sí' && r.certification === 'Autoevaluación') {
        return true;
      }

      return false;
    });

    resultsSummary.categoryNo = _.filter(results, function(r){
      if(r.answer === 'No') {
        return true;
      }

      return false;
    });

    resultsSummary.categoryNA = _.filter(results, function(r){
      if(r.answer === 'N/A') {
        return true;
      }

      return false;
    });

    resultsSummary.categoryUnavailable = _.filter(results, function(r){
      if(r.answer === 'Información No Disponible') {
        return true;
      }

      return false;
    });

    resultsSummary.email = this.getSingleAnswer('51813999')
    resultsSummary.fullname = this.getSingleAnswer('51813966');

    return resultsSummary;
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
      throw new Error('Cannot get answer value for ' + definitionId);
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

};