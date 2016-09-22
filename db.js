var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./lidb.sqlite');







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

