CREATE TABLE folders(
  id SERIAL PRIMARY KEY,
  folder_name TEXT NOT NULL
);

CREATE TABLE notes(
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  folder INTEGER REFERENCES folders(id) NOT NULL,
  date_modified TIMESTAMP DEFAULT NOW() 
);