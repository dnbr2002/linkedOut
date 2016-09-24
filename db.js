const dbFileName = "linkedOut.sqlite";
const sqlCreateTableFileName = "createTables.sql";

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(dbFileName);


var init = true;
// =======
// exports.dbAuthenticateUser = dbAuthenticateUser;
// function dbAuthenticateUser(jsonObj) {
//     return new Promise(function (resolve, reject) {
//         var sqlJson = JSON.parse(jsonObj);
//             console.log("Email: " + sqlJson[0].email + " Password: " + sqlJson[0].password);
//         var stmt=db.prepare("SELECT PK_User, UserName, Email FROM User where Email=? and Password=?;");
//         stmt.all([sqlJson[0].email,sqlJson[0].password],function (err, rows) {
//            // console.log("SQL Row: "+rows[0].email);
//             if (err) {
//                 console.log(err);
//                 reject("logon failed!");
//                 return;
//             }
//             else if (rows == 0) {
//                 console.log("fail");
//                 reject("failed!");
//                 return;
//             }
//             /*
//             else if (rows[0].email == sqlJson[0].email && rows[0].password == sqlJson[0].password) {
//                 console.log("row id: " + rows[0].PK_User);
//                 console.log("username: " + rows[0].username);
//                 console.log("success!!")
//                 resolve(rows);
//             }
//             */
//             else
//                 {
//                 console.log("PK: "+ rows[0].PK_User+"  UserName: "+rows[0].UserName);
//                 resolve(rows);
//             }
//         });
// >>>>>>> a5ab097e78f90ca71c31c0a6b797995e3f6dcc7b

//     });
// }




// Main function
exports.createDB = function (doRunCreateTables = false) {
    console.log("initializing database");
    if (doRunCreateTables && !this.init) {
        db.serialize(function () {
            loadSqlFile((data) => {
                db.exec(data, (err) => {
                    if (err) {
                        console.log(err);
                        throw err;
                    }
                });
            });
        });
        this.init = true;
    }

    this.isInit = function () {
        return this.init;
    }
//add all DB callbacks here
    return this;
}

loadSqlFile = function (callback) {
    var fs = require("fs");
    fs.readFile(sqlCreateTableFileName, "utf-8", (err, data) => {
        if (err != null) {
            throw err;
        } else {
            callback(data);
        }
    });
}
