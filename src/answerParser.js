var _ = require('lodash');

module.exports = function(formResponse) {

  var questions = formResponse.definition.fields;
  var answers = formResponse.answers;

  this.getResultsSummary = function() {
    var resultsSummary = { };

    resultsSummary.email = this.getSingleAnswer('51004236')
    
    _.map(questions, function(q) {
      console.log(q);
    });

    return resultsSummary;
  };

  this.getSingleAnswer = function(definitionId) {
    var targetAnswer = _.find(answers, function(a) {
      return a.field.id === definitionId;
    });

    return getAnswerValue(targetAnswer);
  };

  var getAnswerValue = function(answer) {
    switch(answer.type) {
      case 'boolean':
        return answer.boolean;
      case 'text':
        return answer.text;
      default:
        return ''
    }
  };

};