-- from the terminal run:
-- psql < outer_space.sql

DROP DATABASE IF EXISTS outer_space;

CREATE DATABASE outer_space;

\c outer_space

-- CREATE TABLE planets
-- (
--   id SERIAL PRIMARY KEY,
--   name TEXT NOT NULL,
--   orbital_period_in_years FLOAT NOT NULL,
--   orbits_around TEXT NOT NULL,
--   galaxy TEXT NOT NULL,
--   moons TEXT[]
-- );


CREATE TABLE planets
(
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE moons
(
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE orbits
(
  id SERIAL PRIMARY KEY,
  planetid INT REFERENCES planets,
  period_in_years NUMERIC(5,2),
  orbits_around VARCHAR(25),
  galaxy VARCHAR(25)
);

CREATE TABLE planets_moons
(
  id SERIAL PRIMARY KEY,
  planetid INT REFERENCES planets ON DELETE CASCADE NOT NULL,
  moonid INT REFERENCES moons ON DELETE CASCADE NOT NULL
);

INSERT INTO planets
(name)
VALUES
('Earth'),
('Mars'),
('Venus'),
('Neptune');

INSERT INTO moons
(name)
VALUES
('The Moon'),
('Phobos'),
('Deimos'),
('Naiad'),
('Thalassa'),
('Despina'),
('Galatea');

INSERT INTO planets_moons
(planetid, moonid)
VALUES
(1, 1),
(2, 2),
(2, 3),
(4, 4),
(4, 5),
(4, 6),
(4, 7);

INSERT INTO orbits
(planetid, period_in_years, orbits_around, galaxy)
VALUES
(1, 1.00, 'The Sun', 'Milky Way'),
(2, 1.88, 'The Sun', 'Milky Way'),
(3, 0.62, 'The Sun', 'Milky Way'),
(4, 164.8, 'The Sun', 'Milky Way');
