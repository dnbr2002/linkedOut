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

// exports.selectHomeFeed =selectHomeFeed;
// function selectHomeFeed(userId) {
//     return new Promise(
//             (resolve, reject) => {
//             db.all("select u.name, u.pk_user, p.postpic, p.posttime, c.text  from user u, post p, comment c " +
//             "where u.pk_user = p.posterid and  u.pk_user =c.commenterid and p.pk_post = c.postid and " +
//             "u.pk_user in ( select followeeId from following where followerId = ?) order by posttime desc", userId,
//             function (err, rows) {
//                 if (err) {
//                     console.log(err);
//                     reject(err);
//                     return false;
//                 }
//                 resolve(rows);
//             });
// }).then(
//         (rows) => {
//         console.log("selectUserFeeds rows: " + rows);
//     var jsonrows = JSON.stringify(rows);
//     console.log("selectUserFeeds json: " + jsonrows);
//     return jsonrows;
// }
// ).catch(
//         (err) => {
//         console.log(err);
// });
// }

// exports.dbAddToCommentTable=dbAddToCommentTable;
// function dbAddToCommentTable(jsonStr) {
//     return new Promise(function (resolve, reject) {
//         var sqlJson = JSON.parse(jsonStr);
//         console.log("postid:" + sqlJson[0].postUser + "PostPic:" + sqlJson[0].postData + "PostComment:" + sqlJson[0].postComment);
//         db.run("Insert into Comment (CommenterId, PostId, Text) values (?,(Select PK_Post from Post where posterid=? and postpic=?),?);",
//             sqlJson[0].postUser, sqlJson[0].postUser, sqlJson[0].postData, sqlJson[0].postComment, function (err) {
//                 if (err) {
//                     reject(err);
//                     console.log(err);
//                 }
//                 else {
//                     console.log("success");
//                     resolve();

//                 }
//             });
//     });
// }



