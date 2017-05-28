var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var urlencode = bodyParser.urlencoded({ extended: false });

var persists = require('./src/persists');
var Results = require('./models/results');
var jsonLoader = require('./src/jsonLoader');
var AnswerParser = require('./src/answerParser');

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

app.get('/download', function (request, response) {
  var file = __dirname + '/debug.json';
  response.download(file);
});

app.get('/resultsReport', function (request, response) {
  var jsonLoader = require('./src/jsonLoader');
  var results = jsonLoader('resultSummary.json');

  response.render('pages/resultsPage', results);
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

app.get('/hello', function(request, response){
  
  var obj = {
    categoryYesWithCertification: [],
    categoryYesWithSelfAppraisal: [],
    categoryNo: [],
    categoryNA: [],
    categoryUnavailable: [],
    email: "email@mail.com",
    fullname: "Alan"
  };

  var newResult = new Results(obj);
  newResult.save();

  response.sendStatus(200);
});

app.get('/bye', function(request, response){

   Results.findOne({email: "email@mail.com"}).exec(function (err, result) {
          if(err) throw err;
          
          console.log(result);
          response.sendStatus(200);
    });
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