CREATE TABLE User(  
  PK_User INTEGER NOT NULL PRIMARY KEY,  
  UserName  TEXT,
  Fullname TEXT,
  Email Text,
  Password TEXT,
  PhotoId int,
  FOREIGN Key(PhotoId) References Photo(PK_Photo)  
);  
CREATE TABLE Post(
  PK_Post INTEGER NOT NULL PRIMARY KEY,    
  UserId  int,
  PostTime DATETIME TIMESTAMP DEFAULT CURRENT_TIMESTAMP,   
  Post   TEXT,  
  PhotoId int,  
  FOREIGN Key(PhotoId) References Photo(PK_Photo)  
);

Create Table Following(
PK_Following INTEGER NOT NULL PRIMARY KEY, 
FollowerId int,
FolloweeId int,
FOREIGN KEY(FollowerId) REFERENCES User(PK_User),
FOREIGN KEY(FolloweeId) REFERENCES User(PK_User)
);

CREATE TABLE Comment(
  PK_Comment INTEGER NOT NULL PRIMARY KEY,    
  PostId  int,
  Comment Text,
  CommentTime DATETIME TIMESTAMP DEFAULT CURRENT_TIMESTAMP,     
  FollowingId int,  
  FOREIGN Key(FollowingId) References Following(PK_Following)  
); 

Create Table Like(
PK_Like INTEGER NOT NULL PRIMARY KEY,
LikerId int,
LikeeId int,
PostId int,
FOREIGN KEY(LikerId) REFERENCES User(PK_User),
FOREIGN KEY(LikeeId) REFERENCES User(PK_User),
FOREIGN KEY(PostId) REFERENCES Post(PK_Post) 
);

Create Table Photo(
PK_Photo INTEGER NOT NULL PRIMARY KEY, 
Photoname text,
Mimetype text
);

Create Table Messages(
PK_Messages INTEGER NOT NULL PRIMARY KEY, 
MessengerId int,
MessageeId int,
Subject text,
Message text,
FOREIGN KEY(MessengerId) REFERENCES User(PK_User),
FOREIGN KEY(MessageeId) REFERENCES User(PK_User)
);

