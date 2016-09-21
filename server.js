var path = require('path');
var express = require('express');
var app = express();

app.set('view engine', 'jade');
app.use('/static', express.static(path.join(__dirname, '/public')));

app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
