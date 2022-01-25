
DROP DATABASE IF EXISTS craigslist;

CREATE DATABASE craigslist;

\c craigslist

-- Table Creation
CREATE TABLE regions (
  id SERIAL PRIMARY KEY,
  city VARCHAR(25) NOT NULL,
  state VARCHAR(2) NOT NULL
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(25) NOT NULL
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(20) NOT NULL,
  preferred_region INT REFERENCES regions ON DELETE SET NULL
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  text VARCHAR(1000) NOT NULL,
  userid INT REFERENCES users ON DELETE SET NULL,
  location VARCHAR(25),
  region INT REFERENCES regions ON DELETE SET NULL,
  categoryid INT REFERENCES categories ON DELETE SET NULL
);


-- Insertion
INSERT INTO regions (
  city,
  state
) VALUES
('San Fransisco', 'CA'),
('Atlanta', 'GA'),
('Seattle', 'WA'),
('Norfolk', 'VA');

INSERT INTO users (
  username,
  preferred_region
) VALUES
('johhnyboi75', 2),
('chickenluvr', 1),
('johhnyboi75', 3),
('jwhudnall86', 4),
('samC', 4),
('tuxedo1234', 4);

INSERT INTO categories (
  name
) VALUES
('Camping Equipment'),
('Automotive'),
('Gardening'),
('Electronics');

INSERT INTO posts (
  title,
  text,
  userid,
  location,
  region,
  categoryid
) VALUES
('Mower For Sale', 'I have a lawn mower for sale. Call me for more info.', 4, 'Gloucester', 4, 3),
('Tent For Sale', 'I have a tent for sale. Call me for more info.', 1, 'Matthews', 4, 1),
('99 Chevy Camaro', '99 Chevy Camaro for sale. Call for more info.', 2, 'Middlesex', 4, 2);

-- Queries
-- SELECT username, region, title for automotive categories
SELECT posts.title, users.username
FROM posts
JOIN users
  ON users.id = posts.userid
JOIN categories
  ON categories.id = posts.categoryid
WHERE categories.id = 2;