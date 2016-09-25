// const dbFileName = "linkedOut.sqlite";
// const sqlCreateTableFileName = "createTables.sql";

const dbFileName = "linkedOutSimple.sqlite";
const sqlCreateTableFileName = "SQL_Database_Create.sql";
const sqlInsertDataFileName = 'Insert_Dummy_data.sql';

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(dbFileName);

// Main function
exports.createDB = function () {
    console.log("Initializing database");

    db.serialize(function () {
        runSqlFile(sqlCreateTableFileName, function(data) {
            db.exec(data, (err) => {
                if (err) {
                    console.log('DB construction failed.');
                    throw err;
                    return;
                }
            });

            console.log('DB created');

            populateDB();

        });
    });
}

function runSqlFile(filename, callback) {
    var fs = require("fs");

    fs.readFile(filename, "utf-8", (err, data) => {
        if (err != null) {
            throw err;
        } else {
            callback(data);
        }
    });
}

exports.populateDB = populateDB;

function populateDB() {
    console.log('Inserting test data....');

    db.serialize(function() {
        runSqlFile(sqlInsertDataFileName, function(data) {
            db.exec(data, function(err) {
                if (err) {
                    console.log('Test data insert failed');
                    return;
                }
            });

            console.log('Test data insert complete.');
        });
    });
}
