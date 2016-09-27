var express = require('express');
var multer  = require('multer');
var gm = require('gm');
var upload = multer({ dest: 'uploads/' });

var	bodyParser = require('body-parser');
var	path = require('path');

var app = express();
// app.use(bodyParser({limit: '5mb'}));
var dbManager = require("./db");
var dbApi = require("./data");

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('./public'));

dbManager.createDB();

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

    console.log('Body content is:  ' + JSON.stringify(request.body));

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
    // Need to call add to photo table.
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

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        req.body.generatedname = new Date().getTime() + file.originalname;
        cb(null, req.body.generatedname);
    }
});

app.post('/addpicture', function(req, res)
{
    if (req.body.avatar == undefined)
    {
        console.log('No picture will be added');
    }
    else
    {
        console.log('Picture will be added');
    }
    var upload = multer({storage: storage}).single('avatar');
    var userName;
    var userId;

    var p = new Promise(function(resolve, reject)
    {
        upload(req, res, function (err) {
            console.log('In multer body');
            console.log(JSON.stringify(req.body));
            if (err)
            {
                // An error occurred when uploading
                console.log(err);
                console.log('Error in upload');
                reject(err);

                return
            }
            console.log('Upload worked');
            resolve(req);
        });
    }).then(
        function(data) {
            userName = data.body.username;
            userId = data.body.userid;

            console.log('Calling dbAddPicture for database update');
            dbApi.dbAddPicture(req.body.generatedname, userId, function(somedata, err) {
                console.log('Data has:  ' + somedata);

                if (somedata) {
                    console.log('Insert of picture good');
                    res.send('done');
                } else {
                    res.send('fail');
                }
            });
        },
        function(err) {
            console.log('Upload failed');
            res.send('failure');
        }
    );
});

// Adds a post, with, or without, a picture
app.post('/addpost', function(req, res)
{
    var p = addPicture(req, res);

    // Handle the rest for a post.
    p.then(
        function(data)
        {

            // Always do post Creation
            return dbApi.dbAddPost(
                data.body.userid,
                data.body.post,
                data.body.referencepost,
                data.body.generatedname);
        }
    ).then(
        (data) =>
        {
            // This data is the key to the post
            console.log('The key is:  ' + data);
            console.log('The generated file name is:  ' + req.body.generatedname);

            res.status(200).send('success');
        },
        (err) =>
        {
            res.status(500).send('failure');
        }
    );

});

app.post('/attachpicture', function(req, res)
{
    p = addPicture(req, res);

    p.then(
        function(data)
        {
            userId = data.body.userid;

            // If the generatedname is undefined it means
            // that multer did not find a file to upload
            if (req.body.generatedname == undefined)
            {
                console.log("The generated name was null so it won't add to DB.");
                res.status(404).send('No picture in POST');
            }
            else
            {
                console.log('Calling dbAddPicture for database update');

                dbApi.dbAddPicture(req.body.generatedname, userId, function(somedata, err)
                {
                    if (somedata)
                    {
                        console.log('Insert of picture good');
                        res.send('done');
                    }
                    else
                    {
                        res.send('fail');
                    }
                });

            }

        },
        function(err) {
            console.log('Upload failed');
            res.send('failure');
        }
    );
});

function addPicture(req, res)
{
    var upload = multer({storage: storage}).single('avatar');
    var userName;
    var userId;

    var p = new Promise(function(resolve, reject)
    {
        upload(req, res, function (err) {
            console.log('In multer body');
            console.log(JSON.stringify(req.body));
            if (err)
            {
                // An error occurred when uploading
                console.log(err);
                console.log('Error in upload');
                reject(err);

                return
            }
            console.log('Upload worked');
            resolve(req);
        });
    });

    return p;
}


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
/*
app.get('/home/:id', function (req, res) {
    console.log("AppGet Reqs: " + JSON.stringify(req.body.userid));
    var userid = {
        userid: req.params.id
    }
    jsonStr = '[' + JSON.stringify(userid) + ']';
    console.log("json for user summ: " + jsonStr);
    var p = dbManager2.dbUserSummary(jsonStr);
    p.then(
        (val) => {
        console.log("User Summary from AppGet: " + JSON.stringify(val));
    res.send(val);
}
    ).
    catch(
        (err) => {
        res.send(err);
})
    ;
});
*/
app.get('/home/:id', function (req, res) {
    console.log("req params:  " + req.params.id);
    dbApi.dbUserSummary(req.params.id).then(
        function (data) {
            console.log("app.get success");
            res.status(200).send(data);
        }
    ).catch(
        function (err) {
            res.status(500).send(err);
            console.log("app.get error");
        }
    );
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

app.get('/getskills/:id', function(req, res) {
    dbApi.getSkills(req.params.id, function(data, err) {
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
