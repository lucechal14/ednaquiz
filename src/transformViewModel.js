var _ = require('lodash');
var goals = require('./goalsMeta');

var getGoalInfoByPractice = function(practiceId) {
    return _.find(goals, function(g) {
        return _.findIndex(g.practices, function(p) {
            return p === practiceId;
        }) != -1;
    });
};

var questionsAsStringArray = function (questionArray) {
    return _.reduce(questionArray, function (result, value, key) {
        if (!result.questions) {
            result.questions = [];
        }

        var goal = getGoalInfoByPractice(value.practice);

        result.goalImageClass = goal.goalClass;
        result.goalName = goal.goalName;
        result.questions.push(value.title);
        return result;
    }, {});
};


module.exports = function (results) {
    var viewModel = results;

    viewModel.categoryYesWithCertification = questionsAsStringArray(viewModel.categoryYesWithCertification);
    viewModel.categoryYesWithSelfAppraisal = questionsAsStringArray(viewModel.categoryYesWithSelfAppraisal);
    viewModel.categoryNo = questionsAsStringArray(viewModel.categoryNo);
    viewModel.categoryNA = questionsAsStringArray(viewModel.categoryNA);
    viewModel.categoryUnavailable = questionsAsStringArray(viewModel.categoryUnavailable);

    return viewModel;
}