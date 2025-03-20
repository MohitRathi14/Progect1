const express = require("express");
const path = require("path");

const app = express();


// app.use()
// Set EJS as the view engine
app.set("view engine", "ejs");

// Set a custom directory for EJS files
app.set("views", path.join(__dirname));

// Serve static files (e.g., CSS, images)
app.use("/styles", express.static(path.join(__dirname, "styles")));

// Route for the home page
app.get("/", (req, res) => {
    console.log("Main");
    res.sendFile(path.join(__dirname, "HomePage.html"));
});

// Route for the login page
app.get("/Login", (req, res) => {
    console.log("Login-Page");
    res.render("Login.ejs");
});

// Route for the registration page
app.get("/Registration", (req, res) => {
    console.log("Registration page");
    res.sendFile(path.join(__dirname, "RegisterPage.html"));
});

// Start the server
app.listen(2020, () => {
    console.log("Server is running");
});
