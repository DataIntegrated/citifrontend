CREATE DATABASE IF NOT EXISTS cititax;
SET DATABASE = cititax;

CREATE TABLE IF NOT EXISTS merchants (
  id TEXT PRIMARY KEY NOT NULL,
  pin TEXT,
  vat TEXT,
  name TEXT,
  location TEXT,
  categorytype TEXT,
  username TEXT,
  password TEXT,
  datecreated DATE 
);