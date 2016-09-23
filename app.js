var express = require('express');
var	bodyParser = require('body-parser');
var	path = require('path');
var app = new express();
app.use(bodyParser.json());
var dbManager = require("./db");


app.use('/', express.static('public'));


// Import Express library
// var express = require('express');
// var app = express();


// var session = require('express-session')
// app.use(session({
//     secret: 'currentUser',
//     resave: false,
//     saveUninitialized: false
// }));

// var multer  = require('multer');
// var upload = multer({ dest: 'uploads/' });

// // Set up resources directory to server static files
// app.use(express.static('resources'));





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