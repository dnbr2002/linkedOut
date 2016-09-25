const dbFileName = "linkedOutSimple.sqlite";
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(dbFileName);


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
    var sql = "Insert Into comment (postid, comment) values (?postid, ?comment)";
    doSQL(sql, mapDataElements(jsonObj), cb);
}

function asMyQuote(input) {
    return '\'' + input + '\'';
}

function doSQL(sqlStr, bindings, cb) {
    var p = new Promise((resolve, reject) => {
        db.serialize(() => {
            // var sqlStmt = db.prepare(sqlStr);

            // console.log('Running:  ' + JSON.stringify(sqlStmt));

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
            cb('success');
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
