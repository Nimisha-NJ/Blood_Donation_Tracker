const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "blood_donor_registry",
  user: "postgres",
  password: "123456",
});

module.exports = pool;
