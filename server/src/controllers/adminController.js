const pool = require("../routes/db");

// API to activate user

const updateUserStatus = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(
    `UPDATE users SET status=$1 WHERE id=$2 RETURNING *`,
    [true, id],
    (error, results) => {
      if (error) {
        throw error;
      }

      if (results.rows.length > 0) {
        res
          .status(200)
          .json({
            message: "User status updated to true",
            user: results.rows[0],
          });
      } else {
        res.status(404).json({ message: `User with ID ${id} not found` });
      }
    }
  );
};

// List of appproved users


const approvedUsers = (req, res) => {
  pool.query(
    "SELECT " +
      "users.full_name, " +
      "users.contact_number, " +
      "users.id " +
      "FROM " +
      "users " +
      "INNER JOIN " +
      "donation_records " +
      "ON " +
      "users.id = donation_records.user_id " +
      "WHERE " +
      "donation_records.antibiotic_treatment = FALSE " +
      "AND " +
      "donation_records.serious_illness_surgery = FALSE " +
      "AND " +
      "donation_records.last_donation_date < CURRENT_DATE + INTERVAL '6 months' " +
      "AND " +
      "users.status = TRUE " + // Check if status is true
      "ORDER BY " +
      "users.id",

    (err, results) => {
      if (err) {
        throw err;
      }
      res.status(200).json(results.rows);
    }
  );
};


module.exports = {
  updateUserStatus,
  approvedUsers,
};
