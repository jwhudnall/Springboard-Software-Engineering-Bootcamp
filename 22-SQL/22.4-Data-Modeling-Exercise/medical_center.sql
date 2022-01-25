
DROP DATABASE IF EXISTS medical_center;

CREATE DATABASE medical_center;

\c medical_center

CREATE TABLE doctors (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  specialty TEXT
);

CREATE TABLE patients (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  age INT NOT NULL CHECK (age >= 0),
  date_admitted DATE
);

CREATE TABLE diseases (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  severity TEXT
);

CREATE TABLE doctor_patient_rel (
  id SERIAL PRIMARY KEY,
  doctor_id INT REFERENCES doctors ON DELETE CASCADE,
  patient_id INT REFERENCES patients ON DELETE CASCADE
);

CREATE TABLE patient_disease_rel (
  id SERIAL PRIMARY KEY,
  patient_id INT REFERENCES patients ON DELETE CASCADE,
  disease_id INT REFERENCES diseases ON DELETE CASCADE
);

-- Data Insertion
INSERT INTO doctors (
  first_name,
  last_name,
  specialty
)
  VALUES
  ('John', 'McAdams', 'Oncology'),
  ('Rita', 'Skeeter', 'Pediatrician'),
  ('Ron', 'Ford', 'General Surgeon');

INSERT INTO patients (
  first_name,
  last_name,
  age,
  date_admitted
) VALUES
('Roger', 'Smith', 56, '2021-12-14'),
('Regis', 'Harrison', 36, '2020-07-13'),
('Petunia', 'Shelby', 77, '2022-01-14');

INSERT INTO diseases (
  name
) VALUES
('Chickenpox'),
('Diphtheria'),
('Lymphoma');

INSERT INTO doctor_patient_rel (
  doctor_id,
  patient_id
) VALUES
(1, 1),
(1, 3),
(3, 3),
(3, 2);

INSERT INTO patient_disease_rel (
  patient_id,
  disease_id
) VALUES
(3, 3),
(3, 2),
(1, 1),
(2, 2);

-- Queries
SELECT p.first_name, p.last_name, d.last_name, d.specialty
  FROM doctors d
  JOIN doctor_patient_rel dpr
    ON d.id = dpr.doctor_id
  JOIN patients p
    ON p.id = dpr.patient_id;