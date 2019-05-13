ALTER TABLE users
ADD COLUMN teamid bigserial REFERENCES team(id)
