const pool = require("../routes/db");

//API TO LIST ALL USERS

const getUsers = (req, res) => {
  pool.query("SELECT * FROM users ORDER BY id ", (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
};

// API TO REGISTER USERSgit status


const createUsers = (req, res) => {
  const {
    full_name,
    contact_number,
    date_of_birth,
    weight,
    blood_group,
    email,
    password,
  } = req.body;

  pool.query(
    "INSERT INTO users (full_name, contact_number, date_of_birth, weight, blood_group, email, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
    [
      full_name,
      contact_number,
      date_of_birth,
      weight,
      blood_group,
      email,
      password,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`User added with ID: ${results.rows[0].id}`);
    }
  );
};

// API TO DELETE USERS

const deleteUsers = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(`DELETE from users WHERE id=$1`, [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`User deleted with ID: ${id}`);
  });
};

// API TO SEARCH USER

const searchUser = (req, res) => {
  const query = req.query.query;
  pool.query(
    `SELECT * FROM users WHERE 
      full_name ILIKE $1 OR 
      email ILIKE $1`,
    [`%${query}%`],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};

// API TO LOGIN USER

const loginUser = (req, res) => {
  const { email, password } = req.body;

  pool.query(
    "SELECT * FROM users WHERE email = $1 AND password = $2",
    [email, password],
    (error, results) => {
      if (error) {
        throw error;
      }

      if (results.rows.length > 0) {
        // User found, send a success response
        res
          .status(200)
          .json({ message: "Login successful", user: results.rows[0] });
      } else {
        // User not found or incorrect password
        res.status(401).json({ message: "Invalid credentials" });
      }
    }
  );
};

module.exports = {
  getUsers,
  createUsers,
  deleteUsers,
  searchUser,
  loginUser,
};
