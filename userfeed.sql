SELECT
  pk_post,
  postpicid,
  userid,
  posttime,
  post,
  referencepost,
  followerid,
  followeeid,
  pk_user,
  username,
  fullname,
  userpicid,
  userphotoname,
  ph2.photoname as postphotoname
FROM
(
  SELECT
    pk_post,
    postpicid,
    userid,
    posttime,
    post,
    referencepost,
    followerid,
    followeeid,
    pk_user,
    username,
    fullname,
    userpicid,
    ph.photoname as userphotoname
  FROM
  (
      SELECT
        pk_post,
        posts.photoid as postpicid,
        userid,
        posttime,
        post,
        referencepost,
        followerid,
        followeeid,
        u.pk_user,
        username,
        fullname,
        u.photoid as userpicid
      FROM
        (
          SELECT *
          FROM
          post p LEFT OUTER JOIN following f ON p.userid = f.followeeid AND f.followerid = $USERID
        ) AS posts
          INNER JOIN user AS u ON posts.userid = u.pk_user
  )
  AS myposts
  LEFT OUTER JOIN photo ph ON myposts.userpicid = ph.pk_photo
) AS USERFEED
LEFT OUTER JOIN
    PHOTO ph2 ON USERFEED.postpicid = ph2.pk_photo
