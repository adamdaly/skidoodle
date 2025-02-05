INSERT INTO "User" (name) VALUES ('Name 1');

INSERT INTO "Animation" ("name", "width", "height", "framerate", "userid")
    VALUES ('Animation 1', 1920, 1080, 24, (SELECT id FROM "User" LIMIT 1)),
    ('Animation 2', 1920, 1080, 24, (SELECT id FROM "User" LIMIT 1)),
    ('Animation 3', 1920, 1080, 24, (SELECT id FROM "User" LIMIT 1)),
    ('Animation 4', 1920, 1080, 24, (SELECT id FROM "User" LIMIT 1)),
    ('Animation 5', 1920, 1080, 24, (SELECT id FROM "User" LIMIT 1));

INSERT INTO "Scene" ("name", "index", "userid", "animationid")
    VALUES ('Scene 1', 0, (SELECT id FROM "User" LIMIT 1), (SELECT id FROM "Animation" LIMIT 1)),
    ('Scene 2', 1, (SELECT id FROM "User" LIMIT 1), (SELECT id FROM "Animation" LIMIT 1)),
    ('Scene 3', 2, (SELECT id FROM "User" LIMIT 1), (SELECT id FROM "Animation" LIMIT 1)),
    ('Scene 4', 3, (SELECT id FROM "User" LIMIT 1), (SELECT id FROM "Animation" LIMIT 1)),
    ('Scene 5', 4, (SELECT id FROM "User" LIMIT 1), (SELECT id FROM "Animation" LIMIT 1));