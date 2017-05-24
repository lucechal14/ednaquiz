module.exports = function(formResponse) {

  this.getSingleAnswer = function(definitionId) {
    var questions = formResponse.definition.fields;
    var answers = formResponse.answers;

    // console.log('----- Questions (Definition) -----');
    // console.log(questions);
    // console.log('------------ Answers -------------');
    // console.log(answers);

    return answers[0];
  };

};