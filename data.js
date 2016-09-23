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
             /*
             else if (rows[0].email == sqlJson[0].email && rows[0].password == sqlJson[0].password) {
//                 console.log("row id: " + rows[0].PK_User);
//                 console.log("username: " + rows[0].username);
//                 console.log("success!!")
//                 resolve(rows);
//             }
//             */
             else
                 {
                 console.log("PK: "+ rows[0].PK_User+"  UserName: "+rows[0].UserName);
                 resolve(rows);
             }
         });
     });
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
