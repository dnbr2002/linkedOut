const dbFileName = "linkedOut.sqlite";
const sqlCreateTableFileName = "createTables.sql";

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(dbFileName);

var init = false;




// Main function
module.exports = function (doRunCreateTables = true) {
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

