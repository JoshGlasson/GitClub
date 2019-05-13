DROP TABLE IF EXISTS team;

CREATE TABLE team (
  id bigserial PRIMARY KEY,
  teamname varchar(250) NOT NULL,
  teamcode varchar(250) NOT NULL
);
