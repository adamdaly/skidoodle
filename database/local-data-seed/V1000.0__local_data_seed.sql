WITH animation AS (
    INSERT INTO "Animation" (name, width, height, framerate, userid)
    VALUES ('Animation 1', 1920, 1080, 24, '67f6377edc3489a18950680f')
    RETURNING id, userid
),
scenes AS (
    INSERT INTO "Scene" (name, index, userid, animationid)
    SELECT 
        format('Scene %d', s.index + 1) AS name,
        s.index,
        a.userid,
        a.id
    FROM animation a
    CROSS JOIN generate_series(0, 4) AS s(index)
    RETURNING id, name, index
),
frames AS (
    INSERT INTO "Frame" (length, index, filename, sceneid)
    SELECT 
        2 AS length,
        f.index,
        format('scene_%02d_frame_%03d.png', s.index + 1, f.index + 1) AS filename,
        s.id AS sceneid
    FROM scenes s
    CROSS JOIN generate_series(0, 30) AS f(index)
    RETURNING id, filename, sceneid
)
SELECT 
    s.name AS scene_name,
    f.filename AS frame_filename,
    f.sceneid
FROM frames f
JOIN scenes s ON f.sceneid = s.id
ORDER BY f.sceneid, f.filename;