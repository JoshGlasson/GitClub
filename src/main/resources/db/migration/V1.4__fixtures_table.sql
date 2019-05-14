DROP TABLE IF EXISTS fixtures;

CREATE TABLE fixtures (
  id bigserial PRIMARY KEY,
  date varchar(250) NOT NULL,
  fixture varchar(250) NOT NULL UNIQUE,
  location varchar(250) NOT NULL,
  season varchar(250) NOT NULL,
  result varchar(250),
  motm varchar(250),
  training varchar(250) NOT NULL,
  teamid bigserial REFERENCES team(id)

);
