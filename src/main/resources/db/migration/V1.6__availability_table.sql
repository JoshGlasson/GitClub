DROP TABLE IF EXISTS availability;

CREATE TABLE availability (
  id bigserial PRIMARY KEY,
  userid bigserial REFERENCES users(id),
  fixtureid bigserial REFERENCES fixtures(id)

);
