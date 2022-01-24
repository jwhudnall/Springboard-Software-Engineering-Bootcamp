-- SQL ZOO
-- Part 6
-- 6.1
SELECT matchid, player
FROM goal
WHERE teamid = 'GER'

-- 6.2
SELECT id,stadium,team1,team2
  FROM game
  WHERE id = 1012

-- 6.3
SELECT goal.player, goal.teamid, game.stadium, game.mdate
  FROM game JOIN goal ON (id=matchid)
  WHERE goal.teamid = 'GER';

-- 6.4
SELECT ga.team1, ga.team2, go.player
  FROM game ga
  JOIN goal go
  ON ga.id = go.matchid
  WHERE player LIKE 'Mario%';

-- 6.5
SELECT go.player, go.teamid, e.coach, go.gtime
  FROM goal go
  JOIN eteam e
  ON go.teamid = e.id
 WHERE gtime<=10;

-- 6.6
SELECT ga.mdate, e.teamname
  FROM game ga
  JOIN eteam e
  ON e.id = ga.team1
  WHERE coach = 'Fernando Santos';

-- 6.7
SELECT goal.player
  FROM goal
  JOIN game
    ON game.id = goal.matchid
 WHERE game.stadium = 'National Stadium, Warsaw';

-- 6.8
SELECT DISTINCT player
  FROM game JOIN goal ON matchid = id
  WHERE (goal.teamid=game.team1 AND team2='GER')
  OR (team1 = 'GER' AND goal.teamid=game.team2);

-- 6.9
SELECT teamname, COUNT(*) AS goals_scored
  FROM eteam JOIN goal ON id=teamid
  GROUP BY teamname

-- 6.10
SELECT ga.stadium, COUNT(*) AS goals_scored
  FROM game ga
  JOIN goal go
    ON go.matchid = ga.id
  GROUP BY ga.stadium;

-- 6.11
SELECT goal.matchid, game.mdate, COUNT(*) AS goals_scored
  FROM game JOIN goal ON goal.matchid = game.id
  WHERE (team1 = 'POL' OR team2 = 'POL')
 GROUP BY goal.matchid, game.mdate;

-- 6.12
SELECT go.matchid, ga.mdate, COUNT(*)
  FROM game ga
  JOIN goal go
    ON go.matchid = ga.id
  WHERE go.teamid = 'GER'
 GROUP BY go.matchid, ga.mdate;

-- 6.13
SELECT
  ga.mdate,
  ga.team1,
  SUM( CASE WHEN go.teamid = ga.team1 THEN 1 ELSE 0 END) as score1,
  ga.team2,
  SUM( CASE WHEN go.teamid = ga.team2 THEN 1 ELSE 0 END) AS score2
  FROM game ga
  JOIN goal go
    ON ga.id = go.matchid
  GROUP BY ga.mdate, ga.team1, ga.team2
  ORDER BY ga.mdate, go.matchid, ga.team1, ga.team2;

  -- Part 7
-- 7.1
SELECT id, title
 FROM movie
 WHERE yr=1962

-- 7.2
SELECT yr
FROM movie
WHERE title = 'Citizen Kane';

-- 7.3
SELECT id, title, yr
FROM movie
WHERE title LIKE 'Star Trek%'
ORDER BY yr;

-- 7.4
SELECT id
FROM actor
WHERE name = 'Glenn Close';

-- 7.5
SELECT id
FROM movie
WHERE title = 'Casablanca';

-- 7.6
SELECT actor.name AS cast_list
FROM movie
JOIN casting
  ON movie.id = casting.movieid
JOIN actor
  ON actor.id = casting.actorid
WHERE movieid=11768;

-- 7.7
SELECT name
FROM actor
JOIN casting
  ON casting.actorid = actor.id
JOIN movie
  ON movie.id = casting.movieid
WHERE movie.title = 'Alien';

-- 7.8
SELECT title
FROM movie
JOIN casting
  ON casting.movieid = movie.id
JOIN actor
  ON actor.id = casting.actorid
WHERE actor.name = 'Harrison Ford';

-- 7.9
SELECT title
FROM movie
JOIN casting
  ON casting.movieid = movie.id
JOIN actor
  ON actor.id = casting.actorid
WHERE actor.name = 'Harrison Ford'
AND casting.ord <> 1;

-- 7.10
SELECT title, name AS leading_star
FROM movie
JOIN casting
  ON casting.movieid = movie.id
JOIN actor
  ON actor.id = actorid
WHERE casting.ord = 1
AND movie.yr = 1962;

-- 7.11
SELECT yr,COUNT(title) AS num_movies
FROM
  movie JOIN casting ON movie.id=movieid
        JOIN actor   ON actorid=actor.id
WHERE name='Rock Hudson'
GROUP BY yr
HAVING COUNT(title) > 2

-- 7.12 - Had to reference solution
SELECT title, name
FROM movie
    JOIN casting ON movie.id = movieid
    JOIN actor ON actor.id = actorid
WHERE movieid IN (
                SELECT movieid
                FROM casting
                WHERE actorid = (
                                SELECT id
                                FROM actor
                                WHERE name = 'Julie Andrews'
                                )
                )
AND ord = 1;

-- 7.13
SELECT name
FROM actor
JOIN casting
  ON casting.actorid = actor.id
WHERE casting.ord = 1
GROUP BY actor.name
HAVING count(casting.movieid) >= 15
ORDER BY name;

-- 7.14
SELECT title, COUNT(actorid)
FROM movie
JOIN casting
  ON casting.movieid = movie.id
WHERE movie.yr = 1978
GROUP BY title
ORDER BY count(actorid) DESC, title;

-- 7.15
SELECT DISTINCT name
  FROM casting
  JOIN actor ON (actorid = id AND name != 'Art Garfunkel')
  WHERE movieid IN
    (
    SELECT movieid
    FROM casting
    WHERE actorid = (
                    SELECT id
                    FROM actor
                    WHERE name = 'Art Garfunkel'
                    )
    );