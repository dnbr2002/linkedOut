INSERT INTO user (username, fullname,password, photoid) values ('User1@fakeemail.com', 'GreggyP', 'User1',1);
INSERT INTO user (username, fullname,password, photoid) values ('User2@fakeemail.com', 'BobbyK', 'User2',2);
INSERT INTO user (username, fullname,password, photoid) values ('User3@fakeemail.com', 'HerbS', 'User3',3);
INSERT INTO user (username, fullname,password, photoid) values ('User4@fakeemail.com', 'JohnnyM', 'User4',4);
INSERT INTO user (username, fullname,password, photoid) values ('User5@fakeemail.com', 'MarcC', 'User5',5);
INSERT INTO user (username, fullname,password, photoid) values ('joe@mail.com', 'Joe Sixpack', 'password',6);
Insert into post (userid, post, photoid) values (1,'I am the man!', 6);
Insert into post (userid, post, photoid) values (2,'Reboot it!!', 7);
Insert into post (userid, post, photoid) values (3,'User 3 First Post', 8);
Insert into post (userid, post, photoid) values (4,'User 4 First Post', 9);
Insert into post (userid, post, photoid) values (1,'User 1 Second Post', 10);
Insert into post (userid, post, photoid) values (1,'User 1 Third Post', 11);
Insert into post (userid, post, photoid) values (5,'User 5 First Post', 12);
Insert Into post (userid, referencepost, post) values (2, 1, 'no Im the man!!');
Insert Into post (userid, referencepost, post) values (4, 2, 'you said it');
Insert Into post (userid, referencepost, post) values (1, 3, 'Comment on post id 3');
Insert Into post (userid, referencepost, post) values (1, 4, 'Comment on post id 4');
Insert Into post (userid, referencepost, post) values (1, 1, 'Comment on post id 1 Again');
Insert Into post (userid, referencepost, post) values (2, 1, 'Comment on post id 1 Yet Again');
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
Insert Into photo (photoname, mimetype) values ('User1.jpg','Image/Jpeg');
Insert Into photo (photoname, mimetype) values ('User2.jpg','Image/Jpeg');
Insert Into photo (photoname, mimetype) values ('User3.jpg','Image/Jpeg');
Insert Into photo (photoname, mimetype) values ('User4.jpg','Image/Jpeg');
Insert Into photo (photoname, mimetype) values ('User5.jpg','Image/Jpeg');
Insert Into photo (photoname, mimetype) values ('theman.jpg','Image/Jpeg');
Insert Into photo (photoname, mimetype) values ('reboot.jpg','Image/Jpeg');
Insert Into messages (messengerid, messageeid, reply, message) values ('1','2','first reply', 'first message text');
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
insert into user (username, fullname, password, photoid) values ('corporate@hooli.com', "Hooli Inc.", "password", null);
insert into user (username, fullname, password, photoid) values ('corporate@google.com', "Google Inc.", "password", null);
insert into user (username, fullname, password, photoid) values ('corporate@apple.com', "Apple Computer", "password", null);
insert into user (username, fullname, password, photoid) values ('corporate@piedpiper.com', "Pied Piper, a Compression Company", "password", null);
insert into user (username, fullname, password, photoid) values ('billg@microsoft.com', "Microsoft", "password", null);
insert into user (username, fullname, password, photoid) values ('larry@oracle.com', "Oracle", "password", null);
insert into user (username, fullname, password, photoid) values ('corporate@mutiny.com', "Mutiny", "password", null);
insert into user (username, fullname, password, photoid) values ('corporate@hp.com', "Hewlett Packard Inc.", "password", null);
insert into user (username, fullname, password, photoid) values ('corporate@ibm.com', "Hooli", "password", null);
insert into user (username, fullname, password, photoid) values ('mikee@dell.com', "Hooli", "password", null);
insert into messages (messengerid, messageeid, reply, message) values ('3', "1", "Accept Follow Request", "Please accept");
insert into messages (messengerid, messageeid, reply, message) values ('1', "4", "Hello", "I have some news, call me");
insert into messages (messengerid, messageeid, reply, message) values ('5', "1", "Follow him", "Lewis is online now");
insert into messages (messengerid, messageeid, reply, message) values ('2', "4", "Remarks", "Update your jobs");
insert into messages (messengerid, messageeid, reply, message) values ('5', "6", "Touching base", "Hey there!");
insert into messages (messengerid, messageeid, reply, message) values ('6', "1", "Accept Follow Request", "Done");
insert into messages (messengerid, messageeid, reply, message) values ('4', "1", "Accept Follow Request", "Not sure if I know you?");
insert into messages (messengerid, messageeid, reply, message) values ('1', "6", "Unfollow 'cos", "I am quitting");
insert into messages (messengerid, messageeid, reply, message) values ('5', "2", "Its time to call", "Response needed");



INSERT INTO user (username, fullname,password, photoid) values ('MAllison@fakeemail.com', 'Mose-Allison', 'Mose', 12);
Insert Into photo (photoname, mimetype) values ('12','Image/Jpeg');

INSERT INTO user (username, fullname,password, photoid) values ('B.B.King@fakeemail.com', 'B.B. King', 'King', 13);
Insert Into photo (photoname, mimetype) values ('13','Image/Jpeg');

INSERT INTO user (username, fullname,password, photoid) values ('Lurrie@fakeemail.com', 'Lurrie Bell', 'Bell ', 1);

INSERT INTO user (username, fullname,password, photoid) values ('Wallen@fakeemail.com', 'Woody Allen', 'W.Allen', 14);
Insert Into photo (photoname, mimetype) values ('14','Image/png');

INSERT INTO user (username, fullname,password, photoid) values ('Adam@fakeemail.com', 'Adam Sandler', 'Sandler', 14);
Insert Into photo (photoname, mimetype) values ('15','Image/png');


INSERT INTO user (username, fullname,password, photoid) values ('yancy@fakeemail.com', 'Shawn Yancy', 'Shawn', 1);
INSERT INTO user (username, fullname,password, photoid) values ('sarah@fakeemail.com', 'Sarah Simmons', 'Simmons', 1);
INSERT INTO user (username, fullname,password, photoid) values ('Jim@fakeemail.com', 'Jim Lokay', 'Jim', 1);
INSERT INTO user (username, fullname,password, photoid) values ('barnes@fakeemail.com', 'Tucker Barnes', 'T.Barnes', 1);
INSERT INTO user (username, fullname,password, photoid) values ('yancy@fakeemail.com', 'Shawn Yancy', 'Shawn', 1);


INSERT INTO user (username, fullname,password, photoid) values ('Tarek@hgtv.com', 'Tarek', 'Tarek', 1);
INSERT INTO user (username, fullname,password, photoid) values ('christina@hgtv.com', 'Christina', 'Tina', 1);
INSERT INTO user (username, fullname,password, photoid) values ('pb@hgtv.com', 'Property Brothers', 'Twins', 1);
INSERT INTO user (username, fullname,password, photoid) values ('drew@fakeemail.com', 'Drew', 'Big Brother', 1);
INSERT INTO user (username, fullname,password, photoid) values ('Jonathan@fakeemail.com', 'Jonathan', 'Jonathan buddy', 17);
Insert Into photo (photoname, mimetype) values ('17','Image/png');

INSERT INTO user (username, fullname,password, photoid) values ('scott@hawaii.com', 'Five-0', 'Scott', 18);
INSERT INTO user (username, fullname,password, photoid) values ('jerry@hawaii.com', 'Jerry', 'FiveO Geek)', 19);
INSERT INTO user (username, fullname,password, photoid) values ('alex@hhawaii.com', 'Alex OLoughin, 'Alex', 20);
INSERT INTO user (username, fullname,password, photoid) values ('drew@hawaii.com', 'Drew', 'Big Brother', 1);
INSERT INTO user (username, fullname,password, photoid) values ('kimn@hawaii.com', 'Daniel', 'Dae Kim', 21);

INSERT INTO user (username, fullname,password, photoid) values ('gary@ncis.com', 'Gary Glasberg', 'Boss', 18);
INSERT INTO user (username, fullname,password, photoid) values ('Cotey@ncis.com', 'Cote Pablo', 'Ziva)', 22);
INSERT INTO user (username, fullname,password, photoid) values ('emily@ncis.com', 'Emily Wickersham', 'emily', 23);
INSERT INTO user (username, fullname,password, photoid) values ('mike@hncis.com', 'Michael', 'M. Weatherly', 24);
INSERT INTO user (username, fullname,password, photoid) values ('mark@ncis.com', 'Mark Harmon', 'M. Hamon', 25);

Insert Into photo (photoname, mimetype) values ('18','Image/jpeg);
Insert Into photo (photoname, mimetype) values ('20','Image/jpeg);
Insert Into photo (photoname, mimetype) values ('19','Image/jpeg);
Insert Into photo (photoname, mimetype) values ('21','Image/png);
Insert Into photo (photoname, mimetype) values ('22','Image/png);
Insert Into photo (photoname, mimetype) values ('23','Image/png);
Insert Into photo (photoname, mimetype) values ('24','Image/png);
Insert Into photo (photoname, mimetype) values ('25','Image/png);




insert into messages (messengerid, messageeid, reply, message) values ('25', "12", "", "When is our next show?!");
insert into messages (messengerid, messageeid, reply, message) values ('25', "16", "", "Checkout Twitter!");
insert into messages (messengerid, messageeid, reply, message) values ('33', "2", "", "I have time tomorrow, stop by");
insert into messages (messengerid, messageeid, reply, message) values ('26', "33", "", "No rains here!");
insert into messages (messengerid, messageeid, reply, message) values ('21', "25", "", "We need some latest tools to fix this");
insert into messages (messengerid, messageeid, reply, message) values ('19', "4", "", "On road trip until next month");
insert into messages (messengerid, messageeid, reply, message) values ('2', "1", "", "Checkout these concerts");
insert into messages (messengerid, messageeid, reply, message) values ('6', "5", "", "Come to our Diversity Day Celebrations");
insert into messages (messengerid, messageeid, reply, message) values ('7', "2", "", "When is our next show?!");
insert into messages (messengerid, messageeid, reply, message) values ('21', "1", "", "Checkout Twitter!");