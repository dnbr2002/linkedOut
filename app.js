var express = require('express');

	bodyParser = require('body-parser'),
	path = require('path');

var app = new express();
app.use(bodyParser.json());

app.use('/', express.static('public'));

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.get('/', function(req, res){
  res.sendFile('index.html');
});

// app.post('/', multer({ dest: './uploads/'}).single('upl'), function(req,res){
// 	console.log(req.body); //form fields
// 	/* example output:
// 	{ title: 'abc' }
// 	 */
// 	console.log(req.file); //form files

// 	res.status(204).end();
// });

var port = 8080;
app.listen( port, function(){ console.log('listening on port '+port); } );