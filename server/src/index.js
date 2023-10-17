const express = require("express");
const db = require("./routes/db");
const userController = require("./controllers/userController");
const adminController = require("../src/controllers/adminController");

const app = express();

app.use(express.json());

const PORT = 4000;

app.get("/", (req, res) => {
  res.json({
    info: "connected",
  });
});

app.get("/users", userController.getUsers);
app.post("/users", userController.createUsers);
app.delete("/users/:id", userController.deleteUsers);
app.get("/search", userController.searchUser);
app.post("/login", userController.loginUser);

app.get("/approvedusers", adminController.approvedUsers);
// app.put("/updateUserStatus", adminController.updateUserStatus);
app.put("/users/:id/updateUserStatus", adminController.updateUserStatus);


app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
