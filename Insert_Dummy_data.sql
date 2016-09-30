INSERT INTO user (username, fullname,password, photoid) values ('User1@fakeemail.com', 'GreggyP', 'User1',2);
INSERT INTO user (username, fullname,password, photoid) values ('User2@fakeemail.com', 'BobbyK', 'User2',3);
INSERT INTO user (username, fullname,password, photoid) values ('User3@fakeemail.com', 'HerbS', 'User3',4);
INSERT INTO user (username, fullname,password, photoid) values ('User4@fakeemail.com', 'JohnnyM', 'User4',5);
INSERT INTO user (username, fullname,password, photoid) values ('User5@fakeemail.com', 'MarcC', 'User5',6);
INSERT INTO user (username, fullname,password, photoid) values ('joe@mail.com', 'Joe Sixpack', 'password',7);
insert into user (username, fullname, password, photoid) values ('corporate@hooli.com', "Hooli Inc.", "password", 8);
insert into user (username, fullname, password, photoid) values ('corporate@google.com', "Google Inc.", "password", 9);
insert into user (username, fullname, password, photoid) values ('corporate@apple.com', "Apple Computer", "password", 10);
insert into user (username, fullname, password, photoid) values ('corporate@piedpiper.com', "Pied Piper, a Compression Company", "password", 11);
insert into user (username, fullname, password, photoid) values ('billg@microsoft.com', "Microsoft", "password", 12);
insert into user (username, fullname, password, photoid) values ('larry@oracle.com', "Oracle", "password", 13);
insert into user (username, fullname, password, photoid) values ('corporate@mutiny.com', "Mutiny", "password", 14);
insert into user (username, fullname, password, photoid) values ('corporate@hp.com', "Hewlett Packard Inc.", "password", 15);
insert into user (username, fullname, password, photoid) values ('corporate@ibm.com', "IBM", "password", 16);
insert into user (username, fullname, password, photoid) values ('User6@fakeemail.com', "Dinesh", "User6", 17);
insert into user (username, fullname, password, photoid) values ('User7@fakeemail.com', "Gilfoyle", "User7", 18);

Insert Into photo (photoname, mimetype) values ('conn.jpg','Image/Jpeg');
Insert Into photo (photoname, mimetype) values ('User1.jpg','Image/Jpeg');
Insert Into photo (photoname, mimetype) values ('User2.jpg','Image/Jpeg');
Insert Into photo (photoname, mimetype) values ('User3.jpg','Image/Jpeg');
Insert Into photo (photoname, mimetype) values ('User4.jpg','Image/Jpeg');
Insert Into photo (photoname, mimetype) values ('User5.jpg','Image/Jpeg');
Insert Into photo (photoname, mimetype) values ('theman.jpg','Image/Jpeg');
Insert Into photo (photoname, mimetype) values ('hooli.jpg','Image/Jpeg');
Insert Into photo (photoname, mimetype) values ('google.jpg','Image/Jpeg');
Insert Into photo (photoname, mimetype) values ('apple_web.jpg','Image/png');
Insert Into photo (photoname, mimetype) values ('piedpiper.jpg','Image/png');
Insert Into photo (photoname, mimetype) values ('microsoft.jpg','Image/jpeg');
Insert Into photo (photoname, mimetype) values ('oracle.jpg','Image/jpeg');
Insert Into photo (photoname, mimetype) values ('mutiny.jpg','Image/jpeg');
Insert Into photo (photoname, mimetype) values ('hp.jpg','Image/jpeg');
Insert Into photo (photoname, mimetype) values ('IBM.jpg','Image/png');
Insert Into photo (photoname, mimetype) values ('dinesh.jpg','Image/jpeg');
Insert Into photo (photoname, mimetype) values ('gilfoyle.jpg','Image/png');
Insert Into photo (photoname, mimetype) values ('reboot.jpg','Image/png');
Insert Into photo (photoname, mimetype) values ('theman.jpg','Image/Jpeg');




Insert into post (userid, post, photoid) values (1,'I am the man!', 20);
Insert into post (userid, post, photoid) values (2,'Reboot it!!', 19);
Insert into post (userid, post, photoid) values (3,'Hello Linked Users', 8);
Insert into post (userid, post, photoid) values (4,'Google it!!', 9);
Insert into post (userid, post, photoid) values (1,'I like Apple', 10);
Insert into post (userid, post, photoid) values (1,'Middle out Baby!!', 11);
Insert into post (userid, post, photoid) values (5,'Lets make the world a better place', 8);
Insert Into post (userid, referencepost, post) values (2, 1, 'no Im the man!!');
Insert Into post (userid, referencepost, post) values (4, 2, 'you said it');
Insert Into post (userid, referencepost, post) values (1, 3, 'Comment on post id 3');
Insert Into post (userid, referencepost, post) values (1, 4, 'Comment on post id 4');


Insert into following (followerid, followeeid) values (1, 1);
Insert into following (followerid, followeeid) values (1, 2);
Insert into following (followerid, followeeid) values (2, 2);
Insert into following (followerid, followeeid) values (2, 1);
Insert into following (followerid, followeeid) values (4, 1);
Insert into following (followerid, followeeid) values (2, 3);
Insert into following (followerid, followeeid) values (2, 4);
Insert into following (followerid, followeeid) values (1, 5);
Insert into following (followerid, followeeid) values (5, 1);

Insert Into likes (likerid, likeeid, postid) values (2,1,1);
Insert Into likes (likerid, likeeid, postid) values (1,2,2);


Insert Into education (userid, school, datestart, datefinished, degree) values (1,'University of Viriginia','10/1/2009', '6/1/2013','BS in Information System');
Insert Into education (userid, school, datestart, datefinished, degree) values (1,'University of Maryland','9/1/2013', '6/1/2015','MS in Computer Science');
Insert Into education (userid, school, datestart, datefinished, degree) values (2,'University of Phoenix','10/1/2011', '6/1/2015','BS');
Insert Into education (userid, school, datestart, datefinished, degree) values (3,'University of California Santa Cruz','10/1/2011', '6/1/2015','BS');
Insert Into education (userid, school, datestart, datefinished, degree) values (4,'University of Georgia','10/1/2011', '6/1/2015','BS');

Insert Into jobs (userid, joblocation, jobtitle, datestart, datefinished) values (1,'Little Ceasers', 'cook', '10/1/2004', '6/1/2006');
Insert Into jobs (userid, joblocation, jobtitle, datestart, datefinished) values (1,'Dominos','driver', '10/1/2006', '6/1/2009');
Insert Into jobs (userid, joblocation, jobtitle, datestart, datefinished) values (2,'Walmart', 'stocker', '10/1/2004', '6/1/2006');
Insert Into jobs (userid, joblocation, jobtitle, datestart, datefinished) values (3,'Best Buy','geek squad', '10/1/2004', '6/1/2006');
Insert Into jobs (userid, joblocation, jobtitle, datestart, datefinished) values (4,'Target', 'cashier', '10/1/2004', '6/1/2006');

Insert Into skills (userid, skill, skilldesc) values (1,'J2EE', 'J2EE Skills');
Insert Into skills (userid, skill, skilldesc) values (1,'.Net','.Net Programming');
Insert Into skills (userid, skill, skilldesc) values (1,'C++', 'MFC Programming');
Insert Into skills (userid, skill, skilldesc) values (1,'Perl','Perl Programming');
Insert Into skills (userid, skill, skilldesc) values (1,'HTML', 'Web Programming');

Insert Into messages (messengerid, messageeid, message) values (1, 2, 'first message text');
insert into messages (messengerid, messageeid, message) values (3, 1, "Please accept");
insert into messages (messengerid, messageeid, message) values (1, 4, "I have some news, call me");
insert into messages (messengerid, messageeid, message) values (5, 1, "Lewis is online now");
insert into messages (messengerid, messageeid, message) values (2, 4, "Update your jobs");
insert into messages (messengerid, messageeid, message) values (5, 6, "Hey there!");
insert into messages (messengerid, messageeid, message) values (6, 1, "Done");
insert into messages (messengerid, messageeid, message) values (4, 1, "Not sure if I know you?");
insert into messages (messengerid, messageeid, message) values (1, 6, "I am quitting");
insert into messages (messengerid, messageeid, message) values (5, 2, "Response needed");
insert into messages (messengerid, messageeid,  message) values (25, 12,  "When is our next show?!");
insert into messages (messengerid, messageeid,  message) values (25, 16,  "Checkout Twitter!");
insert into messages (messengerid, messageeid,  message) values (33, 2,  "I have time tomorrow, stop by");
insert into messages (messengerid, messageeid,  message) values (26, 33, "No rains here!");
insert into messages (messengerid, messageeid,  message) values (21, 25, "We need some latest tools to fix this");
insert into messages (messengerid, messageeid,  message) values (19, 4,  "On road trip until next month");
insert into messages (messengerid, messageeid,  message) values (2, 1,  "Checkout these concerts");
insert into messages (messengerid, messageeid,  message) values (6, 5,  "Come to our Diversity Day Celebrations");
insert into messages (messengerid, messageeid, message) values (7, 2,  "When is our next show?!");





