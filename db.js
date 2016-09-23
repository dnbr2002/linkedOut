var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./lidb.sqlite');


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
                console.log("row id: " + rows[0].PK_User);
                console.log("username: " + rows[0].username);
                console.log("success!!")
                resolve(rows);
            }
            */
            else
                {
                console.log("PK: "+ rows[0].PK_User+"  UserName: "+rows[0].UserName);
                resolve(rows);
            }
        });

    });
}


exports.dbAddToCommentTable=dbAddToCommentTable;
function dbAddToCommentTable(jsonStr) {
    return new Promise(function (resolve, reject) {
        var sqlJson = JSON.parse(jsonStr);
        console.log("postid:" + sqlJson[0].postUser + "PostPic:" + sqlJson[0].postData + "PostComment:" + sqlJson[0].postComment);
        db.run("Insert into Comment (CommenterId, PostId, Text) values (?,(Select PK_Post from Post where posterid=? and postpic=?),?);",
            sqlJson[0].postUser, sqlJson[0].postUser, sqlJson[0].postData, sqlJson[0].postComment, function (err) {
                if (err) {
                    reject(err);
                    console.log(err);
                }
                else {
                    console.log("success");
                    resolve();

                }
            });
    });
}


