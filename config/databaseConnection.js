const mongoose = require("mongoose");

const dbconn = mongoose
  .connect(
    "mongodb+srv://aaditya375singh2:mohit@cluster0.habcc3c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Database connection Success");
  })
  .catch((err) => {
    console.log("Some issue in connection ", err);
  });

  module.exports = dbconn;