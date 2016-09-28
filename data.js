//const dbFileName = "linkedOutSimple.sqlite";
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database('linkedOutSimple.sqlite');


exports.dbAuthenticateUser = dbAuthenticateUser;

function dbAuthenticateUser(jsonObj, cb) {
    var p = new Promise(function (resolve, reject) {
        var sqlJson = JSON.parse(jsonObj);

        console.log("Email: " + sqlJson[0].email + " Password: " + sqlJson[0].password);

        var stmt = db.prepare("SELECT pk_user, username, email FROM user where email='?' and password='?';");
        stmt.all([sqlJson[0].email, sqlJson[0].password], function (err, rows) {
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
                console.log("PK: " + rows[0].PK_User + "  UserName: " + rows[0].UserName);
                resolve(rows);
            }
        });
    });

    p.then(
        function (data) {
            cb(data);
        },
        function (err) {
            cd(null, err);
        }
    );
}

exports.dbUserSummary = dbUserSummary;
function dbUserSummary(jsonObj) {
    var sqlJson = JSON.parse(jsonObj);
    console.log("PK_User dbUserSummary: " + sqlJson);
    return new Promise(function (resolve, reject) {
        db.serialize(function () {
//            var stmt = "Select u.FullName, p.Photoname from User u, Photo P where u.PK_User=" + sqlJson + " and p.Photoname=(select p.Photoname from Photo p, User u where u.PhotoId=p.PK_Photo) ";
            var stmt= "Select u.FullName, p.Photoname, j.joblocation, j.jobtitle, j.datefinished from User u, Photo P, Jobs j "+
                "where u.PK_User="+sqlJson+" and p.Photoname=(select p.Photoname from Photo p, User u where u.PhotoId=p.PK_Photo) and j.userid="+sqlJson+" "+
                "order by j.datefinished desc "+
                "Limit 1";
            console.log(stmt);

            db.all(stmt, function (err, rows) {
                if (rows != undefined && rows.length === 1) {
                    console.log('Got User Summary Info')
                    console.log(rows[0]);
                    resolve(rows[0]);
                } else {
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
        function (data) {
            // console.log('Sending back ' + JSON.stringify(data));
            cb(data);
        },
        function (err) {
            cb(null, err);
        }
    )
}

function mapDataElements(jsonObj) {
    dataObj = {};

    for (key in jsonObj) {
        dataObj['$' + key] = jsonObj[key];
    }

    console.log('mapDataElements: Mapped as:  ' + JSON.stringify(dataObj));
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

exports.dbAddPost = dbAddPost;
function dbAddPost(jsonObj, cb) {
    var sql = "Insert into post (userid, posttime, post) values ($userid, $posttime, $postbody)";
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
                    console.log('SQL failed:  ' + JSON.stringify(bindings));
                    reject(err);
                }
                else {
                    console.log('SQL succeeded:  ' + sqlStr);
                    resolve();
                }
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

exports.getConnection = getConnection;
function getConnection(userid, cb) {
    var sql = "SELECT  u1.username, u1.fullname, p1.photoname FROM user u1 INNER JOIN photo AS p1 ON u1.photoid  = p1.pk_photo WHERE u1.pk_user  in   (SELECT followerid from following msg where msg.followeeid=" + userid+") and u1.pk_user NOT IN (" +userid+")";
    getData(sql, cb);
}

exports.getUnconnectted = getUnconnectted;
function getUnconnectted(userid, cb) {
    var sql = "SELECT  u1.username, u1.fullname, p1.photoname FROM user u1 INNER JOIN photo AS p1 ON u1.photoid  = p1.pk_photo WHERE u1.pk_user  in   (SELECT followerid from following msg where msg.followeeid NOT IN (" +userid+"))";
    getData(sql, cb);
}

function getData(sql, cb) {
    // Run SQL and pass results to callback
    var p = new Promise(function (resolve, reject) {
        db.serialize(function () {
            db.all(sql, function (err, rows) {
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
        function (data) {
            // console.log('Sending back ' + JSON.stringify(data));
            cb(data);
        },
        function (err) {
            cb(null, err);
        }
    )
}

exports.dbAddPost = dbAddPost;
function dbAddPost(userid, post, referencepost = null, generatedName = null)
{
    if (referencepost == undefined)
    {
        referencepost = null;
    }

    var sqlStr1 = "INSERT INTO POST (userid, post, referencepost) VALUES (" + userid + ", " + asMyQuote(post) + ", " + referencepost + ");";
    var sqlStr2 = "SELECT LAST_INSERT_ROWID() AS dakey";

    var p = new Promise(function(resolve, reject)
    {
        db.serialize(function()
        {
            console.log('dbAddPost running SQL:  ' + sqlStr1);
            db.run(sqlStr1, function(err)
            {
                if (err)
                {
                    reject(err);
                }
                resolve();
            });
        });
    }).then(
        function(data)
        {
            return new Promise(function(resolve, reject)
            {
                db.serialize(function()
                {
                    console.log("dbAddPost running SQL:  " + sqlStr2);

                    db.each(sqlStr2, function(err, row)
                    {
                        console.log(JSON.stringify(row));
                        if (err)
                        {
                            reject(err);
                        }
                        else
                        {
                            resolve(row.dakey);
                        }
                    });
                });
            });
        },
        function(err)
        {
            console.log(err);
        }
    ).then(
        function(data)
        {
            // Data is the key.
            if (generatedName == undefined || generatedName == null)
            {
                // If there is no picture to process just return key.
                return(data);
            }
            else
            {
                return dbAddPictureToPost(generatedName, data);
            }
        },
        function(err)
        {
            console.log('Failed on post insert and key retrieval');
        }
    );

    return p;

}

exports.dbAddPicture = dbAddPicture;
function dbAddPicture(filename, userid, cb) {
    var sqlStr = "INSERT INTO PHOTO (photoname, mimetype) values (" + asMyQuote(filename) + ", 'image/jpeg')";

    var p = new Promise((resolve, reject) =>
    {
        db.serialize(function ()
        {
            db.exec(sqlStr, function (err)
            {
                if (err)
                {
                    console.log('SQL failed:  ' + sqlStr);
                    reject(err);
                    return;
                }
                else
                {
                    console.log('SQL succeeded:  ' + sqlStr);
                    resolve(filename);
                    return;
                }
            });
        });
    }).then(
        function (data)
        {
            return new Promise(function (resolve, reject)
            {
                db.serialize(function ()
                {
                    db.all("SELECT pk_photo FROM photo WHERE photoname = '" + filename + "'", function (err, rows)
                    {
                        console.log("Making Pass");
                        if (err)
                        {
                            console.log(err);
                            reject(err);
                            return;
                        }

                        resolve(rows[0].pk_photo);
                    });
                });
            });
        },
        function (err) {
            console.log(err);
        }
    ).then(
        function (data)
        {
            var updSql = "UPDATE USER SET photoid = " + data + " WHERE pk_user = " + userid;
            console.log('Executing ' + updSql);

            return new Promise(function (resolve, reject)
            {
                db.serialize(function ()
                {
                    db.exec(updSql, function (err)
                    {
                        if (err)
                        {
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
        function (err) {
            console.log('Error inserting into photo table ' + err);
        }
        ).then(
        function (data) {
            console.log('Update of user table succeeded');
            cb(data);
        },
        function (err) {
            console.log('Error updating user table');
            cb(null, err);
        }
    );
}

exports.dbAddPictureToPost = dbAddPictureToPost;
function dbAddPictureToPost(filename, postid) {
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
            var updSql = "UPDATE POST SET photoid = " + data + " WHERE pk_post = " + postid;
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
    );

    return p;
}
//getMessages - Rita

exports.dbgetMessages = dbgetMessages;
function dbgetMessages(userid) {

    return new Promise(function (resolve, reject) {
        db.serialize(function () {
            var sql = "SELECT u1.username AS loggedUser, u2.username AS senderName, subject, message from messages msg " +
                " INNER JOIN user AS u1 ON msg.messengerid = u1.pk_user " +
                " INNER JOIN user AS u2  ON msg.messageeid = u2.pk_user " +
                " where msg.messengerid = " + userid;

            db.all(sql, function (err, rows) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rows);
            });
        });
    });
}



//End getMessages - Rita

exports.dbGetUserFeed = dbGetUserFeed;
function dbGetUserFeed(userid) {
    // var userSql = "select * from post p left outer join following f on p.userid = f.followeeid and f.followerid = " + userid;

    // var userSql =
    //     "select * from "
    //     + "(select * from post p left outer join following f on p.userid = f.followeeid and f.followerid = "
    //     + userid
    //     + ") inner join user u on userid = u.pk_user";

    var userSql =
        "select * from "
        + "("
        + "select "
        + " pk_post, userid, posttime, post, referencepost, followerid, followeeid, u.pk_user, username, fullname, u.photoid "
        + " from "
        + "(select * from post p left outer join following f on p.userid = f.followeeid and f.followerid = "
        + userid
        + ") as posts "
        + "inner join user as u on posts.userid = u.pk_user "
        + ") "
        + "as myposts "
        + "left outer join "
        + "photo ph on myposts.photoid = ph.pk_photo";

    var p = new Promise(function(resolve, reject) {
        db.serialize(function() {
            // console.log('Running SQL:  ' + userSql);

            db.all(userSql, function(err, rows) {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });

            // This is how you do it with each, callback, complete fxn
            //
            // db.each(userSql, function(err, rows) {
            //     // Do some stuff
            // },
            // function(err, numrows) {
            //     // In here put resolve
            //     resolve(accumulator);
            // });
        });
    }).then(
        (rows) => {
            var includedposts = [];
            var excludedposts = [];
            var allposts = [];

            // console.log(JSON.stringify(rows));

            for (row of rows) {
                if (row.userid == userid || row.followerid == userid) {
                    // console.log('Pushing to includes ' + JSON.stringify(row));
                    includedposts.push(row);
                } else {
                    // console.log('Pushing to excludes ' + JSON.stringify(row));
                    excludedposts.push(row);
                }
            }

            var postsToAddOn = [];

            // console.log('Includes are:  ' + JSON.stringify(includedposts));
            // console.log('Excludes are:  ' + JSON.stringify(excludedposts));

            var sortFxn = function(a, b) {
                if (a.posttime < b.posttime) return 1
                else if (a.posttime > b.posttime) return -1
                else return 0
            }

            includedposts.sort(sortFxn);
            excludedposts.sort(sortFxn);

            // Check this list of both arrays
            for (excludedpost of excludedposts) {
                for (includedpost of includedposts) {
                    if (includedpost.referencepost == excludedpost.pk_post) {
                        postsToAddOn.push(excludedpost);
                    }
                }
            }

            allposts = includedposts.concat(postsToAddOn);

            // console.log('Posts to addon is:  ' + JSON.stringify(postsToAddOn));
            // console.log('All Posts is:  ' + JSON.stringify(allposts));

            var userFeed = {};
            var referenceFeed = {};

            for (aPost of allposts) {
                if (aPost.referencepost == undefined || aPost.referencepost == null) {
                    // console.log('Adding to userFeed:  ' + JSON.stringify(aPost));
                    userFeed[aPost.pk_post] = aPost;
                } else {
                    if (referenceFeed[aPost.referencepost] == undefined) {
                        referenceFeed[aPost.referencepost] = [aPost];
                    } else {
                        referenceFeed[aPost.referencepost].push(aPost);
                    }
                }
            }

            // console.log('User Feed contents:  ' + JSON.stringify(userFeed));

            for (key in userFeed) {
                if (referenceFeed[key] !== undefined) {
                    userFeed[key].comments = referenceFeed[key];
                }
            }

            // Do the sort on user feed once you have it collected.

            var userFeedArr = [];

            for (key in userFeed) {
                userFeedArr.push(userFeed[key]);
            }

            return(userFeedArr);
        },
        (err) => {
            console.log('Error getting posts');
        }
    );

    return p;
}

exports.dbGetNotFollowing = dbGetNotFollowing;
function dbGetNotFollowing(userid) {
    var ffSql = "select followeeid from following where followerid = " + userid;
    var userSql = "select * from user u left outer join photo ph on u.photoid = ph.pk_photo";

    var p = new Promise(function(resolve, reject) {
        db.serialize(function() {
            db.all(ffSql, function(err, rows) {
                if (err) reject(err);

                var leaders = [];

                for (key in rows) {
                    leaders.push(rows[key].followeeid);
                }

                resolve(leaders);
            })
        });
    }).then(
        (leaders) => {
            // console.log('Leaders are:  ' + JSON.stringify(leaders));

            return new Promise(function(resolve, reject) {
                db.serialize(function() {
                    db.all(userSql, function(err, users) {
                        if (err) {
                            reject(err);
                        }


                        var nonUsers = users.filter(function(nonUserEle, index, array) {
                            if (leaders.find(function(userEle, index, array) {
                                    return userEle === nonUserEle.pk_user;
                                }) !== undefined) {

                                // In this case the find call on leaders found a match
                                return false;
                            } else {
                                return true;
                            }
                        });

                        // console.log('Non Users are:  ' + JSON.stringify(nonUsers));

                        resolve(nonUsers);
                    })
                });
            });
        }
    ).catch(function(reason) {
        console.log('getting not following failed:  ' + reason);
    });

    return p;
}
