var express = require('express');

var	bodyParser = require('body-parser');
var	path = require('path');

var app = express();
app.use(bodyParser.json());
var dbManager = require("./db");
var dbApi = require("./data");

app.use(bodyParser.urlencoded({extended: true}));

app.use('/', express.static('public'));

dbManager.createDB();
// dbManager.populateDB();

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





/*
app.get('/AuthUser/:username/:password', function (req, res) {
	console.log("AuthUser: Username " + req.params.username + ", Password " + req.params.password);
	var validateUser = {
		username:  req.params.username,
		password:  req.params.password
	};
	//console.log("AuthenticateUser json obj:"+ validateUser.username + "," + validateUser.password);
	jSONStr = '[' + JSON.stringify(validateUser) + ']';
	console.log("jSONStr: " + jSONStr);
	dbAuthenticateUser(jSONStr);
	res.end;

});
*/

// app.run('/AuthUser', function(req, res) {
// 	console.log("email: "+req.body.email);
// 	console.log("password: "+req.body.password);
// 	var UserCred = {
// 		email: req.body.email,
// 		password: req.body.password
// 	}
// 	console.log("AuthenticateUser json obj:"+ UserCred.email + "," + UserCred.password);
// 	jsonStr = '[' + JSON.stringify(UserCred) + ']';
// 	console.log("jSONStr: " + jsonStr);
// 	dbAuthenticateUser(jsonStr);
// 	res.end;
// 	//res.sendFile(__dirname + '/public/partials/home.html');
// });

/*

app.post('/AuthUser', function(req, res) {
	console.log("email: "+req.body.email);
	console.log("password: "+req.body.password);
	var UserCred = {
		email: req.body.email,
		password: req.body.password
	}
	console.log("AuthenticateUser json obj:"+ UserCred.email + "," + UserCred.password);
	jsonStr = '[' + JSON.stringify(UserCred) + ']';
	console.log("jSONStr: " + jsonStr);
	dbAuthenticateUser(jsonStr);
	res.end;
	//res.sendFile(__dirname + '/public/partials/home.html');
	});
	*/


/*
app.get('/createPost/:postData/:postComment/:postUser', function (req, res) {
	console.log("createPost:" + req.params.postData + ","+req.params.postComment+"," + req.params.postUser);
	var createPost = {
		postData:  req.params.postData,
		postComment:  req.params.postComment,
		postUser:  req.params.postUser
	};
	console.log("createPost json obj:" + createPost.postData + "," + createPost.postComment + "," + createPost.postUser);
	jSONStr = '[' + JSON.stringify(createPost) + ']';
	console.log("jSONStr: " + jSONStr);
	dbAddToPostsTable(jSONStr);
	dbAddToCommentTable(jSONStr);
	res.end();
});
*/


// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.get('/', function(req, res){
  res.sendFile('index.html');
});

app.post('/login', function(request, response) {
    // dbApi.loginUser(request.body.email).then(
    //     user => {
    //         response.send(user);
    //     }).catch(err => {
    //             console.log(err);
    //             response.status(500);
    //             response.send(err);
    //     });

    dbApi.loginUser(request.body.email, function(data, err) {
        if (data) {
            console.log("Sending login success");
            response.status(200).send(data);
        } else {
            console.log("Sending login failure");
            response.status(500).send(err);
        }
    });
});

app.post('/adduser', function(req, res) {
    // jsonObj = {};
    // jsonObj['$username'] = req.body.username;
    // jsonObj['$password'] = req.body.password;
    // jsonObj['$fullname'] = req.body.fullname;
    // jsonObj['$photoid'] = req.body.photoid;

    dbApi.dbCreateUser(req.body, function(data, err) {
        if (data) {
            console.log('Successful insert');
            res.status(200).send(data);
        } else {
            console.log('Call failed');
            res.status(500).send('failure');
        }
    });
});

app.post('/addeducation', function(req, res) {
    dbApi.dbAddEducation(req.body, function(data, err) {
        if (data) {
            console.log('Successful insert');
            res.status(200).send(data);
        } else {
            console.log('Call failed');
            res.status(500).send(err);
        }
    });
});

app.get('/geteducation/:id', function(req, res) {
    dbApi.getEducation(req.params.id, function(data, err) {
        if (data) {
            res.status(200).send(data);
        } else {
            res.status(500).send('fail');
        }
    })
})

app.get('/getjobs/:id', function(req, res) {
    dbApi.getJobs(req.params.id, function(data, err) {
        if (data) {
            res.status(200).send(data);
        } else {
            res.status(500).send('fail');
        }
    })
})

app.post('/addcomment', function(req, res) {
    dbApi.dbAddComment(req.body, function(data, err) {
        if (data) {
            res.status(200).send('success');
        } else {
            res.status(500).send('failure');
        }
    });
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
