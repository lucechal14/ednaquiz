var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({ extended: false });
var main = require('./src/main');

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

app.post('/tryme', function(request, response){
  console.log('Connecting typeform');
  
  main.run(request.body);
  response.sendStatus(200);
});

app.post('/tryme', function(request, response){
  console.log('Connecting typeform');
  
  main.run(request.body);
  response.sendStatus(200);
});

app.post('/tryme', function(request, response){
  console.log('Connecting typeform');
  
  main.run(request.body);
  response.sendStatus(200);
});

app.get('/hello', function(request, response){
  main.debug(request.body);
  response.sendStatus(200);
});

app.listen(app.get('port'), function () {
  console.log('Example app listening on port ', app.get('port'));
});