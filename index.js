var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var urlencode = bodyParser.urlencoded({ extended: false });

var persists = require('./src/persists');
var Results = require('./models/results');
var jsonLoader = require('./src/jsonLoader');
var AnswerParser = require('./src/answerParser');
var transformToViewModel = require('./src/transformViewModel');

app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function (request, response) {
  response.render('pages/landingPage');
});

app.get('/test', function (request, response) {
  response.render('pages/testingPage');
});

app.get('/resultsReport', function (request, response) {

var targetEmail = request.query.email;
  console.log('Searching results for ', targetEmail);
  Results.findOne({email: targetEmail}).exec(function (err, result) {
          if(err) throw err;

          try {
            var viewModel = transformToViewModel(result);
            persists.saveJsonToFile(viewModel);
            response.render('pages/resultsPage', viewModel);
          } catch (error) {
            console.log('Error from results report!!!');
            console.log(error);
            response.sendStatus(400);    
          }
    });
});

app.post('/saveResults', function(request, response){
  console.log('Saving from typeform');
  
  var postObj = request.body;

  var formResponse = postObj.form_response;
  var parser = new AnswerParser(formResponse);
  var userResults = parser.getResultsSummary();

  var newResult = new Results(userResults);
  newResult.save();

  response.sendStatus(200);
});

app.post('/debugResults', function(request, response){
  console.log('Debugging from typeform');
  var postObj = request.body;
  persists.saveJsonToFile(postObj);
  response.sendStatus(200);
});

app.get('/download', function (request, response) {
  var file = __dirname + '/debug.json';
  response.download(file);
});

app.listen(app.get('port'), function () {
  console.log('Example app listening on port ', app.get('port'));
});

var mongoDB = process.env.MONGODB_URI || 'mongodb://heroku_p5jdj1g6:14q3dm8rjbilpdpt5stunuo2qg@ds155201.mlab.com:55201/heroku_p5jdj1g6';
// mongodb://localhost/my_database
// 
mongoose.connect(mongoDB, function (err, res) {
    if (err) { 
        console.log ('ERROR connecting to db ');
    } else {
        console.log ('Succeeded connected to db ');
    }
});