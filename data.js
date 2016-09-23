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
function dbCreateUser(jsonObj) {
    var sql =
        'INSERT INTO USERAUTHENTICATE (USERNAME, PASSWORD, CREATIONDATE) VALUES ('
        + asMyQuote(jsonObj['username'])
        + ", "
        + asMyQuote(jsonObj['password'])
        + ", "
        + asMyQuote(new Date())
        +')';

    return doSQL(sql);
}

function asMyQuote(input) {
    return '\'' + input + '\'';
}

function doSQL(sqlStr, mydb = db) {
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

    return p;
}
