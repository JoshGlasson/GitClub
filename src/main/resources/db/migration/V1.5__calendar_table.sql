DROP TABLE IF EXISTS calendar;

CREATE TABLE calendar (
  id bigserial PRIMARY KEY,
  title varchar(250) NOT NULL UNIQUE,
  start varchar(250) NOT NULL,
  color varchar(250) NOT NULL,
  teamid bigserial REFERENCES team(id)
);
