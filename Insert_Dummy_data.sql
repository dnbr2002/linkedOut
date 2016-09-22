INSERT INTO User (UserName, FullName,Email,Password, PhotoId) values ('User1', 'GreggyP', 'User1@fakeemail.com','User1',1);

INSERT INTO User (UserName, FullName,Email,Password, PhotoId) values ('User2', 'BobbyK', 'User2@fakeemail.com','User2',2);

INSERT INTO User (UserName, FullName,Email,Password, PhotoId) values ('User3', 'HerbS', 'User3@fakeemail.com','User3',3);

INSERT INTO User (UserName, FullName,Email,Password, PhotoId) values ('User4', 'JohnnyM', 'User4@fakeemail.com', 'User4',4);

INSERT INTO User (UserName, FullName,Email,Password, PhotoId) values ('User5', 'MarcC', 'User5@fakeemail.com','User5',5);

Insert into Post (UserId, Post) values (1,'I am the man!', 6);

Insert into Post (UserId, Post) values (2,'Reboot it!!', 7);

Insert into Following (FollowerId, FolloweeId) values (1, 1);

Insert into Following (FollowerId, FolloweeId) values (1, 2);

Insert into Following (FollowerId, FolloweeId) values (2, 2);

Insert into Following (FollowerId, FolloweeId) values (2, 1);

Insert Into Like (LikerId, LikeeId, PostId) values (2,1,1);

Insert Into Like (LikerId, LikeeId, PostId) values (1,2,2);

Insert Into Comment (PostId, Comment, FollowingId) values (1, 'no Im the man!!', 4);

Insert Into Comment (PostId, Comment, FollowingId) values (2, 'you said it', 2);

Insert Into photo (PhotoName, Mimetype) values ('User1.jpg','Image/Jpeg');

Insert Into photo (PhotoName, Mimetype) values ('User2.jpg','Image/Jpeg');

Insert Into photo (PhotoName, Mimetype) values ('User3.jpg','Image/Jpeg');

Insert Into photo (PhotoName, Mimetype) values ('User4.jpg','Image/Jpeg');

Insert Into photo (PhotoName, Mimetype) values ('User5.jpg','Image/Jpeg');

Insert Into photo (PhotoName, Mimetype) values ('theman.jpg','Image/Jpeg');

Insert Into photo (PhotoName, Mimetype) values ('reboot.jpg','Image/Jpeg');

Insert Into messages (MessengerId, MessageeId, Subject, Message) values ('1','2','first subject', 'first message text');

