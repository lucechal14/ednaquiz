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
    var x11= _.reduce(questionArray, function (result, value, key) {
        
        if (!result.sections) {
            result.sections = [];
        }

        var goal = getGoalInfoByPractice(value.practice);

        var section = _.find(result.sections, function(s) {
            return s.goalImageClass === goal.goalClass;
        });

        if(!section) {
            section =  {};
            section.goalImageClass = goal.goalClass;
            section.goalName = goal.goalName;
            section.questions = [];

            result.sections.push(section);
        }
        
        section.questions.push(value.title);        

        return result;
    }, {});

    return x11.sections;
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