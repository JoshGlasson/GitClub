DROP TABLE IF EXISTS calendar;

CREATE TABLE calendar (
  id bigserial PRIMARY KEY,
  time varchar(250) NOT NULL,
  title varchar(250) NOT NULL UNIQUE,
  teamid bigserial REFERENCES team(id)
);
