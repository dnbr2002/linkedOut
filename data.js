//const dbFileName = "linkedOutSimple.sqlite";
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database('linkedOutSimple.sqlite');


exports.dbAuthenticateUser = dbAuthenticateUser;

function dbAuthenticateUser(jsonObj, cb) {
    var p = new Promise(function (resolve, reject) {
        var sqlJson = JSON.parse(jsonObj);

        console.log("Email: " + sqlJson[0].email + " Password: " + sqlJson[0].password);

        var stmt = db.prepare("SELECT pk_user, username, email FROM user where email='?' and password='?';");
        stmt.all([sqlJson[0].email,sqlJson[0].password], function (err, rows) {
            // console.log("SQL Row: "+rows[0].email);
            if (err) {
                console.log(err);
                reject("logon failed!");
                return;
            } else if (rows == 0) {
                console.log("fail");
                reject("failed!");
                return;
            } else {
                console.log("PK: "+ rows[0].PK_User+"  UserName: "+rows[0].UserName);
                resolve(rows);
            }
        });
    });

    p.then(
        function(data) {
            cb(data);
        },
        function(err) {
            cd(null, err);
        }
    );
}


/*
function dbUserSummary(jsonObj) {
    return new Promise (function (resolve, reject) {
        var sqlJson = JSON.parse(jsonObj);
        console.log("Email: "+ sqlJson[0].userid);
        var stmt = db.prepare("Select u.FullName, p.Photoname from User u, Photo P where u.PK_User=? and p.Photoname=(select p.Photoname from Photo p, User u where u.PhotoId=p.PK_Photo) ");
        stmt.all(sqlJson[0].userid, function (err, rows) {
            if(err){
                console.log(err);
                reject("logon failed!");
                return;
            }
            else if (rows == 0) {
                console.log("no user exists with id " + sqlJson[0].userid)
                reject();
                return
            }
            else
            {
                console.log("rows returned for: " + JSON.stringify(rows[0]))
                resolve(rows);
            }
        })
    })
}
*/
exports.dbUserSummary = dbUserSummary;
function dbUserSummary(jsonObj) {
    var sqlJson = JSON.parse(jsonObj);
    console.log("PK_User: "+ sqlJson);
    return new Promise(function (resolve, reject) {
        db.serialize(function () {
            var stmt= "Select u.FullName, p.Photoname from User u, Photo P where u.PK_User="+sqlJson+" and p.Photoname=(select p.Photoname from Photo p, User u where u.PhotoId=p.PK_Photo) ";
            console.log(stmt);

            db.all(stmt, function(err, rows) {
                if (rows != undefined && rows.length === 1) {
                    console.log('Got User Summary Info')
                    console.log(rows[0]);
                    resolve(rows[0]);
                }else {
                    console.log('No User Summary retrieved from DB');
                    reject("User does not exist");
                }
            })

        })
    })
}

function loginUser(userId, cb) {
    var p = new Promise(function (resolve, reject) {
        db.serialize(function () {
            var sql = "SELECT u.pk_user, u.fullname from user u where u.username = " + asMyQuote(userId);

            console.log(sql);

            db.all(sql, function (err, rows) {
                if (rows !== undefined && rows.length === 1) {
                    console.log('User exists')
                    resolve(rows[0]);
                } else {
                    console.log('User does not exist')
                    reject("User does not exist");
                }
            });
        });
    });

    p.then(
        function(data) {
            // console.log('Sending back ' + JSON.stringify(data));
            cb(data);
        },
        function(err) {
            cb(null, err);
        }
    )
}

function mapDataElements(jsonObj) {
    dataObj = {};

    for (key in jsonObj) {
        dataObj['$' + key] = jsonObj[key];
    }

    console.log('Mapped as:  ' + JSON.stringify(dataObj));
    return dataObj;
}

exports.dbCreateUser = dbCreateUser;
function dbCreateUser(jsonObj, cb) {
    var sql = "INSERT INTO USER (USERNAME, FULLNAME, PASSWORD, PHOTOID) VALUES ($username, $fullname, $password, $photoid)";

    // var parms = [];
    // parms.push(jsonObj.username);
    // parms.push(jsonObj.fullname);
    // parms.push(jsonObj.password);
    // parms.push(jsonObj.photoid);

    doSQL(sql, mapDataElements(jsonObj), cb);
}

exports.dbAddComment = dbAddComment;
function dbAddComment(jsonObj, cb) {
    var sql = "Insert into post (userid, referencepost, post) values ($userid, $referencepost, $post)";
    doSQL(sql, mapDataElements(jsonObj), cb);
}

exports.dbAddEducation = dbAddEducation;
function dbAddEducation(jsonObj, cb) {
    var sql = "Insert into education (userid, school, datestart, datefinished) values ($userid, $school, $datestart, $datefinished)";
    doSQL(sql, mapDataElements(jsonObj), cb);
}


function asMyQuote(input) {
    return '\'' + input + '\'';
}

function doSQL(sqlStr, bindings, cb) {
    var p = new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run(sqlStr, bindings, (err) => {
                if (err) {
                    console.log('SQL failed:  ' + sqlStr);
                    reject(err);
                }

                console.log('SQL succeeded:  ' + sqlStr);
                resolve();
            });
        });
    });

    p.then(
        (data) => {
            console.log('Doing callback');
            cb('success');
        },
        (err) => {
            cb(null, err);
        }
    );
}

exports.getUserFeed = getUserFeed;
function getUserFeed(userid, cb) {
    // Returns an array of the pk_users the user id is Following
    var posts = {};
    var comments = {};

    var sqlStr =
        "select * from "
        + "post p "
        + "LEFT OUTER JOIN "
        + "photo ph on p.photoid = ph.pk_photo "
        + "INNER JOIN following f on f.followeeid = p.userid "
        + "INNER JOIN user u on u.pk_user = p.userid "
        + "WHERE f.followerid = "
        + userid;


    var p = new Promise(function(resolve, reject) {
        db.serialize(function() {
            var sql = "SELECT * FROM POST WHERE USERID = " + userid;

            db.all(sqlStr, function(err, rows) {
                var posts = [];
                var comments = [];

                for (row in rows) {
                    if (row.referencepost == null) {
                        posts.push(row);
                    } else {
                        comments.push(row);
                    }
                }

                for (comment of comments) {
                    var refPost = comment.referencepost;

                    // If the posts object doesn't already exist, add it
                    if (posts[refPost] == undefined) {

                        var postComments = posts[comment.referencepost]['comments'];

                    }
                }
            });
        });
    });
}

exports.getEducation = getEducation;
function getEducation(userid, cb) {
    var sql = "select * from education where userid = " + userid;
    getData(sql, cb);
}

exports.getJobs = getJobs;
function getJobs(userid, cb) {
    var sql = "select * from jobs where userid = " + userid;
    getData(sql, cb);
}

exports.getSkills = getSkills;
function getSkills(userid, cb) {
    var sql = "select * from skills where userid = " + userid;
    getData(sql, cb);
}

function getData(sql, cb) {
    // Run SQL and pass results to callback
    var p = new Promise(function(resolve, reject) {
        db.serialize(function() {
            db.all(sql, function(err, rows) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rows)
            })
        });
    });

    p.then(
        (data) => {
            cb(data);
        },
        (err) => {
            cb(null, err);
        }
    );
}

exports.loginUser = loginUser;

function loginUser(userId, cb) {
    var p = new Promise(function (resolve, reject) {
        db.serialize(function () {
            var sql = "SELECT u.pk_user, u.fullname, u.photoid from user u where u.username = " + asMyQuote(userId);

            console.log(sql);

            db.all(sql, function (err, rows) {
                if (rows !== undefined && rows.length === 1) {
                    console.log('User exists')
                    resolve(rows[0]);
                } else {
                    console.log('User does not exist')
                    reject("User does not exist");
                }
            });
        });
    });

    p.then(
        function(data) {
            // console.log('Sending back ' + JSON.stringify(data));
            cb(data);
        },
        function(err) {
            cb(null, err);
        }
    )
}

exports.dbAddPicture = dbAddPicture;
function dbAddPicture(filename, userid, cb) {
    var sqlStr = "INSERT INTO PHOTO (photoname, mimetype) values (" + asMyQuote(filename) + ", 'image/jpeg')";

    var p = new Promise((resolve, reject) => {
        db.serialize(function() {
            db.exec(sqlStr, function(err) {
                if (err) {
                    console.log('SQL failed:  ' + sqlStr);
                    reject(err);
                    return;
                } else {
                    console.log('SQL succeeded:  ' + sqlStr);
                    resolve(filename);
                    return;
                }
            });
        });
    }).then(
        function(data) {
            return new Promise(function(resolve, reject) {
                db.serialize(function() {
                    db.all("SELECT pk_photo FROM photo WHERE photoname = '" + filename + "'", function(err, rows) {
                        console.log("Making Pass");
                        if (err) {
                            console.log(err);
                            reject(err);
                            return;
                        }

                        resolve(rows[0].pk_photo);
                    });
                });
            });
        },
        function(err) {
            console.log(err);
        }
    ).then(
        function(data) {
            var updSql = "UPDATE USER SET photoid = " + data + " WHERE pk_user = " + 6;
            console.log('Executing ' + updSql);

            return new Promise(function(resolve, reject) {
                    db.serialize(function() {
                        db.exec(updSql, function(err) {
                            if (err) {
                                console.log('SQL failed:  ' + updSql);
                                reject(err);
                                return;
                            }

                            console.log('SQL succeeded:  ' + updSql);
                            resolve('success');
                        });
                    });
                }
            );
        },
        function(err) {
            console.log('Error inserting into photo table ' + err);
        }
    ).then(
        function(data) {
            console.log('Update of user table succeeded');
            cb(data);
        },
        function(err) {
            console.log('Error updating user table');
            cb(null, err);
        }
    );
}
