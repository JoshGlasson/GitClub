DROP TABLE IF EXISTS calendar;

CREATE TABLE calendar (
  id bigserial PRIMARY KEY,
  title varchar(250) NOT NULL,
  start varchar(250) NOT NULL,
  color varchar(250) NOT NULL,
  teamid bigserial REFERENCES team(id),
  fixtureid bigserial REFERENCES fixtures(id)
);
