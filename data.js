const dbFileName = "linkedOut.sqlite";
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(dbFileName);


exports.dbAuthenticateUser = dbAuthenticateUser;
    function dbAuthenticateUser(jsonObj) {
        return new Promise(function (resolve, reject) {
            var sqlJson = JSON.parse(jsonObj);

            console.log("Email: " + sqlJson[0].email + " Password: " + sqlJson[0].password);
            var stmt=db.prepare("SELECT PK_User, UserName, Email FROM User where Email=? and Password=?;");
            stmt.all([sqlJson[0].email,sqlJson[0].password],function (err, rows) {
                // console.log("SQL Row: "+rows[0].email);
                if (err) {
                    console.log(err);
                    reject("logon failed!");
                    return;
                }
             else if (rows == 0) {
                 console.log("fail");
                 reject("failed!");
                 return;
             }
             else
                 {
                 console.log("PK: "+ rows[0].PK_User+"  UserName: "+rows[0].UserName);
                 resolve(rows);
             }
         });
     });
 }

exports.dbCreateUser = dbCreateUser;
function dbCreateUser(jsonObj, cb) {
    var sql =
        'INSERT INTO USERAUTHENTICATE (USERNAME, PASSWORD, CREATIONDATE) VALUES ('
        + asMyQuote(jsonObj['username'])
        + ", "
        + asMyQuote(jsonObj['password'])
        + ", "
        + asMyQuote(new Date())
        +')';

    doSQL(sql, cb);
}

exports.dbAddCert = dbAddCert;
function dbAddCert(jsonObj, cb) {
    var sql =
        'INSERT INTO CERTIFICATIONS (CNAME, CSTARTDATE, CENDDATE) VALUES ('
        + asMyQuote(jsonObj.cname)
        + ", "
        + asMyQuote(jsonObj.cstartdate)
        + ", "
        + asMyQuote(jsonObj.cenddate)
        +')';

    doSQL(sql, cb);
}

exports.dbAddComment = dbAddComment;
function dbAddComment(jsonObj, cb) {
    var sql =
        'INSERT INTO COMMENTS (COMMENTBODY, CREATIONDATE, POSTID, USERID) VALUES ('
        + asMyQuote(jsonObj.commentbody)
        + ", "
        + asMyQuote(jsonObj.creationdate)
        + ", "
        + asMyQuote(jsonObj.postid)
        + ", "
        + asMyQuote(jsonObj.userid)
        +')';

    doSQL(sql, cb);
}

function asMyQuote(input) {
    return '\'' + input + '\'';
}

function doSQL(sqlStr, cb, mydb = db) {
    var p = new Promise((resolve, reject) => {
        mydb.serialize(() => {
            mydb.run(sqlStr, (err) => {
                console.log('Running:  ' + sqlStr);
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
function loginUser(userId) {
    return new Promise(
            (resolve, reject) => {
                db.serialize(function () {
                    db.all("SELECT u.userid, u.username from userauthenticate u where u.username = '" + userId + "'", function (err, rows) {
                            if (rows.length === 1) {
                                resolve(rows[0]);
                            } else {
                                reject("User does not exist");
                            }

                        });
                });
            });
}
