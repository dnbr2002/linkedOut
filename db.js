var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./lidb.sqlite');



exports.AuthenticateUser = AuthenticateUser;
function AuthenticateUser(Obj){
    return new Promise(
            (resolve, reject) => {
            //logic
            var table = "User";
    var where = " WHERE email = '" + obj + "'";
    var sql = "SELECT PK_User, Name FROM " + table + where + ";";
    //console.log(sql);
    db.all(sql, function (err, rows) {
        if (err) {
            //console.log(err);
            reject("failed!");
            return;
        }
        //console.log("typeof rows " + (typeof rows[0]));
        if(typeof rows[0] === "undefined"){
            reject("failed!");
            return;
        }else{
            // console.log("PK_User " + rows[0].PK_User);
            // console.log("Name " + rows[0].Name);
            // console.log("obj " + obj);

            if(rows[0].Name == obj){
                // console.log("row id" + rows.PK_User);
                // console.log("username " +rows.Name  + " pk " + rows.PK_User);
                resolve(rows[0].PK_User);
                return;
            }else{
                reject("failed!");
                return;
            }

        }

        //console.log(rows);
        //resolve(row);
    });
});
};



exports.selectHomeFeed =selectHomeFeed;
function selectHomeFeed(userId) {
    return new Promise(
            (resolve, reject) => {
            db.all("select u.name, u.pk_user, p.postpic, p.posttime, c.text  from user u, post p, comment c " +
            "where u.pk_user = p.posterid and  u.pk_user =c.commenterid and p.pk_post = c.postid and " +
            "u.pk_user in ( select followeeId from following where followerId = ?) order by posttime desc", userId,
            function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(err);
                    return false;
                }
                resolve(rows);
            });
}).then(
        (rows) => {
        console.log("selectUserFeeds rows: " + rows);
    var jsonrows = JSON.stringify(rows);
    console.log("selectUserFeeds json: " + jsonrows);
    return jsonrows;
}
).catch(
        (err) => {
        console.log(err);
});
}

