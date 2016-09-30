//mocha tests for DB layer
var dbInit = require('../db');
var db = require('../data');

var chai = require('chai');
var expect = require("chai").expect;
chai.should();

var assert = chai.assert;

before(function() {
  dbInit.createDB();
});

describe('Linked Out DB tests', function () {

    describe('positive control, test nothing', function () {
        it('should pass', function() {
            assert.isTrue(true);
        });
    });

    describe('testing basic funtions', function() {
        it('login function should return valid user', function(done) {
            var emailAddr = "User1@fakeemail.com";
            db.loginUser(emailAddr, function cb(){
                cb(data);
            });
            done();
        });

        it('getAllPost for user1 function should return some posts', function(done) {
            var userid = '1';
            db.dbGetUserFeed(userid).then(
                (listings) => {
                    assert.isAtLeast(listings.length, 7, 'there are more than 7 posts by user1');
                },
                (fail) => {
                    console.log(fail);
                });
                done();
        });

        it('dbUserSummary function should return a single user', function(done) {
            var userid = '1';
            db.dbUserSummary(userid).then(
                (listings) => {
                    assert.equal(listings.length, 1, 'found one user');
                },
                (fail) => {
                    console.log(fail);

                });
                done();
        });

        it('getEducation for user1 function should return 2 items', function(done) {
            var userid = '1';
            db.getEducation(userid, function cb(){
                cb(data);
                assert.isAtLeast(data.length, 2, 'there are at least 2 education records by user1');
            });
            done();
        });

        it('getFollowers for user1 function should return 2 items', function(done) {
            var userid = '1';
            db.getConnection(userid, function cb(){
                cb(data);
                assert.isAtLeast(data.length, 2, 'there are at least 2 followers to user1');
            });
            done();
        });

         it('getNonFollowers for user1 function should return 13 items', function(done) {
            var userid = '1';
            db.dbGetNotFollowing(userid).then(
                (listings) => {
                    assert.isAtLeast(listings.length, 13, 'there are at least 13 non followers to user1');
                },
                (fail) => {
                    console.log(fail);
                });
                done();
        });

        // it('createNewUser function should return new user ID', function(done) {

        //     var UserObj = function(email, name) {
        //         this.email = email;
        //         this.name = name;
        //     };

        //     var user = new UserObj(Math.random().toString(36).substring(7), "Chris Ellis");

        //     db.createNewUser(user).then(
        //         (result) => {
        //             var json = JSON.stringify(eval("(" + result + ")"));
        //             expect(json.rowid).should.exist;
        //             done();
        //         }
        //     );

        // });
    });
});
