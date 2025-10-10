const express = require("express");
const app = express();
const port = 3000;
// app.js
const path = require("node:path");


app.get("/", (req, res) => {
  res.send("Hello World!");
});


// app.js
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


