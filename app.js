const express = require("express");
const app = express();
// app.use(express.static);
const ejs = require("ejs");
const path = require("path");
const dbconn = require("./config/databaseConnection");
const { userRegister, userLogin, emailVerification } = require("./controllers/userController");
app.use(express.urlencoded({ extended: true }));

//this is the root route or home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "HomePage.html"));
});
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname,  "RegisterPage.html"));
});
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "login.ejx"));
});
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname,  "HomePage.html"));
});
app.post("/create-new-user", async (req, res) => {
  const { username, email, password } = req.body;
  await userRegister(username, email, password)
});
app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;
  await userLogin(email, password)
});

app.get("/verify-email", (req, res) => {
 console.log("Demo")
 console.log(req.query.id)
 emailVerification(req.query.id)
});
app.listen(1234, () => {
  console.log("the server is running");
});



