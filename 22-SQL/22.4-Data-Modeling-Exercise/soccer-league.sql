
DROP DATABASE IF EXISTS soccer_league;

CREATE DATABASE soccer_league;

\c soccer_league

CREATE TABLE teams (
  id SERIAL PRIMARY KEY,
  name VARCHAR(25) NOT NULL
);

CREATE TABLE players (
  id SERIAL PRIMARY KEY,
  teamid INT REFERENCES teams,
  playername VARCHAR(25) NOT NULL
);

CREATE TABLE goals (
  id SERIAL PRIMARY KEY,
  teamid INT REFERENCES teams,
  playerid INT REFERENCES players
);

CREATE TABLE referees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(25) NOT NULL
);

CREATE TABLE seasons (
  id SERIAL PRIMARY KEY,
  start_date DATE,
  end_date DATE
);

CREATE TABLE matches (
  id SERIAL PRIMARY KEY,
  team1id INT REFERENCES teams NOT NULL,
  team2id INT REFERENCES teams NOT NULL,
  date DATE NOT NULL,
  seasonid INT REFERENCES seasons NOT NULL
);

CREATE TABLE referees_matches_ref (
  id SERIAL PRIMARY KEY,
  matchid INT REFERENCES matches  ON DELETE CASCADE NOT NULL,
  refid INT REFERENCES referees ON DELETE CASCADE NOT NULL
);

CREATE TABLE results (
  id SERIAL PRIMARY KEY,
  teamid INT REFERENCES teams NOT NULL,
  matchid INT REFERENCES matches NOT NULL,
  result VARCHAR(4) NOT NULL CHECK (result IN ('win', 'loss', 'draw'))
);