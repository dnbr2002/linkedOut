DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS following;
DROP TABLE IF EXISTS likes;
DROP TABLE IF EXISTS photo;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS education;
DROP TABLE IF EXISTS jobs;
DROP TABLE IF EXISTS skills;

CREATE TABLE user(
    pk_user INTEGER NOT NULL PRIMARY KEY,
    username  TEXT,
    fullname TEXT,
    password TEXT,
    photoid int,
    FOREIGN Key(photoid) References photo(pk_photo)
);

CREATE TABLE post(
    pk_post INTEGER NOT NULL PRIMARY KEY,
    userid  int,
    posttime DATETIME TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    post   TEXT,
    photoid int,
    referencepost INT,
    FOREIGN Key(photoid) References photo(pk_photo),
    FOREIGN KEY(userid) REFERENCES user(pk_user)
);

Create Table following(
    pk_following INTEGER NOT NULL PRIMARY KEY,
    followerid int,
    followeeid int,
    FOREIGN KEY(followerid) REFERENCES user(pk_user),
    FOREIGN KEY(followeeid) REFERENCES user(pk_user)
);

Create Table likes(
    pk_likes INTEGER NOT NULL PRIMARY KEY,
    likerid int,
    likeeid int,
    postid int,
    FOREIGN KEY(likerid) REFERENCES user(pk_user),
    FOREIGN KEY(likeeid) REFERENCES user(pk_user),
    FOREIGN KEY(postid) REFERENCES post(pk_post)
);

Create Table photo(
    pk_photo INTEGER NOT NULL PRIMARY KEY,
    photoname text,
    mimetype text
);

Create Table messages(
    pk_messages INTEGER NOT NULL PRIMARY KEY,
    messengerid int,
    messageeid int,
    reply text,
    message text,
    FOREIGN KEY(messengerid) REFERENCES user(pk_user),
    FOREIGN KEY(messageeid) REFERENCES user(pk_user)
);

CREATE TABLE education(
    pk_education INTEGER NOT NULL PRIMARY KEY,
    userid  int,
    school TEXT,
    datestart DATETIME TIMESTAMP,
    datefinished DATETIME TIMESTAMP,
    degree TEXT,
    FOREIGN Key(userid) References user(pk_user)
);

CREATE TABLE jobs(
    pk_jobs INTEGER NOT NULL PRIMARY KEY,
    userid  int,
    joblocation TEXT,
    jobtitle TEXT,
    datestart DATETIME TIMESTAMP,
    datefinished DATETIME TIMESTAMP,
    FOREIGN Key(userid) References user(pk_user)
);

CREATE TABLE skills(
    pk_skills INTEGER NOT NULL PRIMARY KEY,
    userid  int,
    skill TEXT,
    skilldesc TEXT,
    FOREIGN Key(userid) References user(pk_user)
);
