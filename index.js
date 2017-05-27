var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function (request, response) {
  response.render('pages/landingPage');
});

app.get('/test', function (request, response) {
  response.render('pages/testingPage');
});

app.get('/download', function (request, response) {
  var file = __dirname + '/examples/typeform_webhook_response.json';
  response.download(file);
});

app.get('/resultsReport', function (request, response) {
  var objectWithParams = {
    city: {
      name: 'Mexico',
      description: 'Almost voting day!'
    }
  };

  response.render('show.ejs', objectWithParams);
});

app.post('/tryme', function(request, response){
  console.log(request.body)
  response.send(200);
});

app.listen(app.get('port'), function () {
  console.log('Example app listening on port ', app.get('port'));
});