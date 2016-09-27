var express = require('express');
var multer = require('multer');
var gm = require('gm');
var upload = multer({ dest: 'uploads/' });

var bodyParser = require('body-parser');
var path = require('path');

var app = express();
// app.use(bodyParser({limit: '5mb'}));
var dbManager = require("./db");
var dbApi = require("./data");

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('./public'));

dbManager.createDB();

app.get('/', function (req, res) {
    res.sendFile('index.html');
});

app.post('/login', function (request, response) {
    // dbApi.loginUser(request.body.email).then(
    //     user => {
    //         response.send(user);
    //     }).catch(err => {
    //             console.log(err);
    //             response.status(500);
    //             response.send(err);
    //     });

    console.log('Body content is:  ' + JSON.stringify(request.body));

    dbApi.loginUser(request.body.email, function (data, err) {
        if (data) {
            console.log("Sending login success");
            response.status(200).send(data);
        } else {
            console.log("Sending login failure");
            response.status(500).send(err);
        }
    });
});


app.post('/adduser', function (req, res) {
    // Need to call add to photo table.
    dbApi.dbCreateUser(req.body, function (data, err) {
        if (data) {
            console.log('Successful insert');
            res.status(200).send(data);
        } else {
            console.log('Call failed');
            res.status(500).send('failure');
        }
    });
});

app.post('/addpicture', function (req, res) {
    var upload = multer({ dest: './public/uploads' }).single('avatar');
    var userName;
    var userId;

    var p = new Promise(function (resolve, reject) {
        upload(req, res, function (err) {
            console.log('In multer body');
            console.log(JSON.stringify(req.body));

            if (err) {
                // An error occurred when uploading
                console.log(err);
                console.log('Error in upload');
                reject(err);

                return
            }
            // console.log(req.file.filename);
            console.log('Upload worked');
            // console.log(req.file.size);

            // Resize and rewrite
            // console.log('')
            // console.log(JSON.stringify(req.body));
            // var upFlNm = req.file.path;
            // var username = req.body.username;
            resolve(req);
        });
    }).then(
        function (data) {
            return new Promise(function (resolve, reject) {
                gm(data.file.path).thumb(100, 100, './public/uploads/littlethumbs/' + data.body.username + "_thumb.jpg", 100, function (err, stdout, stderr, command) {
                    if (err) {
                        // console.log('Error found');
                        console.log(err);
                        // console.log('Moving on');
                        reject(err);
                    }
                    console.log('100 pixel thumb done.');
                    resolve(data);
                });
            });
        },
        function (err) {
            console.log('Upload of file itself failed.');
        }
        ).then(
        function (data) {
            return new Promise(function (resolve, reject) {
                gm(data.file.path).thumb(200, 200, './public/uploads/bigthumbs/' + data.body.username + "_thumb.jpg", 100, function (err, stdout, stderr, command) {
                    if (err) {
                        // console.log('Error found');
                        console.log(err);
                        // console.log('Moving on');
                        reject(err);
                    }

                    console.log('200 pixel thumb done.');
                    resolve(data);
                });
            });
        },
        function (err) {
            console.log('Creation of small thumb failed.');
            console.log(err);
        }
        ).then(
        function (data) {
            userName = data.body.username;
            userId = data.body.userid;

            console.log('Calling dbAddPicture for database update');
            dbApi.dbAddPicture(userName + "_thumb.jpg", userId, function (somedata, err) {
                console.log('Data has:  ' + somedata);

                if (somedata) {
                    console.log('Insert of picture good');
                    res.send('done');
                } else {
                    res.send('fail');
                }
            });
        },
        function (err) {
            console.log('Creation of large thumb failed.');
            res.send('failure');
        }
        );
});

app.post('/addeducation', function (req, res) {
    dbApi.dbAddEducation(req.body, function (data, err) {
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

app.get('/posts/:id', function (req, res) {
    console.log("req params:  " + req.params.id);
    dbApi.getUserFeed(req.params.id).then(
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

app.get('/getjobs/:id', function (req, res) {
    dbApi.getJobs(req.params.id, function (data, err) {
        if (data) {
            res.status(200).send(data);
        } else {
            res.status(500).send('fail');
        }
    })
})

app.get('/getskills/:id', function (req, res) {
    dbApi.getSkills(req.params.id, function (data, err) {
        if (data) {
            res.status(200).send(data);
        } else {
            res.status(500).send('fail');
        }
    })
})

app.post('/addcomment', function (req, res) {
    dbApi.dbAddComment(req.body, function (data, err) {
        if (data) {
            res.status(200).send('success');
        } else {
            res.status(500).send('failure');
        }
    });
});


// getMessages - rita
app.get('/getmessages/:id', function (req, res) {
    console.log("In app.js req params:  " + req.params.id);
    dbApi.dbgetMessages(req.params.id).then(
        (rows) => {
            console.log("in app.js sending message data:", rows);
            res.status(200).send(rows);
        }
    ).catch(
        (err) => {
            res.status(500).send('fail');
        }
        );
});




app.post('/addpost', function(req, res) {
    dbApi.dbAddPost(req.body, function(data, err) {
        if (data) {
            res.status(200).send('success');
        } else {
            res.status(500).send('failure');
        }
    });
});



var port = 8080;
app.listen(port, function () { console.log('listening on port ' + port); });
