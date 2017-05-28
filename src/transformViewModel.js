var _ = require('lodash');


var questionsAsStringArray = function(questionArray) {
    return _.reduce(questionArray, function(result, value, key){
            if(!result.questions) {
                result.questions = []; 
            }
            result.goalImageClass = "goal1";
            result.goalName = "FIN DE LA POBREZA";
            result.questions.push(value.title);
            return result;
        }, {});
};


module.exports = function(results) {
    var viewModel = results;
    
    viewModel.categoryYesWithCertification = questionsAsStringArray(viewModel.categoryYesWithCertification);
    viewModel.categoryYesWithSelfAppraisal = questionsAsStringArray(viewModel.categoryYesWithSelfAppraisal);
    viewModel.categoryNo = questionsAsStringArray(viewModel.categoryNo);
    viewModel.categoryNA = questionsAsStringArray(viewModel.categoryNA);
    viewModel.categoryUnavailable = questionsAsStringArray(viewModel.categoryUnavailable);

    return viewModel;
}