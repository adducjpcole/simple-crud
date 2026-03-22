-- ============================================================
-- Medical Laboratory Systems — Database Seed
-- Run this in your Supabase SQL Editor (or local psql)
-- ============================================================

-- 1. Units of Measure Table
CREATE TABLE uom (
  id          BIGSERIAL PRIMARY KEY,
  name        VARCHAR(15) UNIQUE NOT NULL,
  description TEXT
);

-- 2. Medical Test Categories Table
CREATE TABLE testcategories (
  id          BIGSERIAL PRIMARY KEY,
  name        VARCHAR(50) UNIQUE NOT NULL,
  description TEXT
);

-- 3. Medical Tests Table
CREATE TABLE medicaltests (
  id          BIGSERIAL PRIMARY KEY,
  name        VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  iduom       BIGINT REFERENCES uom(id),
  idcategory  BIGINT REFERENCES testcategories(id),
  normalmin   REAL,
  normalmax   REAL
);

-- ============================================================
-- B. Data Insertion
-- ============================================================

-- Units of Measure
INSERT INTO uom (name, description) VALUES
  ('mg/dL',    'Measures concentration of substances in blood'),
  ('mmol/L',   'Measures concentration of chemicals in blood (International)'),
  ('g/dL',     'Measures protein levels such as hemoglobin'),
  ('IU/L',     'Measures enzyme or hormone activity levels'),
  ('cells/µL', 'Counts the number of cells in blood');

-- Test Categories
INSERT INTO testcategories (name, description) VALUES
  ('BCT', 'Blood Glucose Test'),
  ('CBC', 'Complete Blood Count'),
  ('LFT', 'Liver Function Test');

-- Medical Tests
INSERT INTO medicaltests (name, description, iduom, idcategory, normalmin, normalmax) VALUES
  (
    'Fasting Blood Glucose',
    NULL,
    (SELECT id FROM uom           WHERE name = 'mg/dL'),
    (SELECT id FROM testcategories WHERE name = 'BCT'),
    70, 99
  ),
  (
    'Hemoglobin Male',
    NULL,
    (SELECT id FROM uom           WHERE name = 'g/dL'),
    (SELECT id FROM testcategories WHERE name = 'CBC'),
    13.5, 17.5
  ),
  (
    'Hemoglobin Female',
    NULL,
    (SELECT id FROM uom           WHERE name = 'g/dL'),
    (SELECT id FROM testcategories WHERE name = 'CBC'),
    12.5, 15.5
  ),
  (
    'White Blood Cell Count',
    NULL,
    (SELECT id FROM uom           WHERE name = 'cells/µL'),
    (SELECT id FROM testcategories WHERE name = 'CBC'),
    4000, 11000
  ),
  (
    'Alanine Aminotransferase',
    NULL,
    (SELECT id FROM uom           WHERE name = 'IU/L'),
    (SELECT id FROM testcategories WHERE name = 'LFT'),
    7, 56
  );
