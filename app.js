const express = require("express");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));
// app.use()
// Set EJS as the view engine
app.set("view engine", "ejs");
const mongo = require("mongoose");
const { default: mongoose } = require("mongoose");
mongo.connect("mongodb+srv://aaditya375singh2:mohit@cluster0.habcc3c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").
then(() => {
    console.log("connect to db");
}).catch((err) => {
    console.log("error", err);
});
const UserSchema =  mongoose.Schema({
    name: String,
    email: String,
    password: String,
    isVerified: Boolean,
});
const UserModel =  mongoose.model("User", UserSchema);
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
app.post("/login-user", async(req, res) => {
    console.log("login user", req.body);
    try {
        const { email, password } = req.body;
        const exist = await UserModel.findOne({ email: email});
        if (exist) {
            if (exist.password === password && exist.isVerified) {
                res.status(200).send("Login Successful");
            } else if (exist.password === !password ) {
                console.log("Incorrect password");
            }else if(!exist.isVerified) {
                console.log("User not verified");
            }
            
        }else {
            return res.status(400).send("User not found");
        }
        
    } catch (error) {
        res.status(400).send({ message: "Error login user", error: error.message });}
});
app.get("/Login", (req, res) => {

    console.log("Login-Page");
    res.render("Login.ejs");

});
app.post("/crate-new-user", async (req, res) => {
    console.log("Creating new user", req.body);
    try {
        const { username, email, password } = req.body;
        const exist = await UserModel.findOne({ email: email });
        if (exist) {
            return res.status(400).sand("User already exists");
        }else {
        const user = new UserModel({ name:username, email, password:password ,isVerified:false});
        await user.save();
        res.status(201).send("User Created");}
    } catch (error) {
        res.status(400).send({ message: "Error creating user", error: error.message });}
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
