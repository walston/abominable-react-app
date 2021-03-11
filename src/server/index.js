const express = require("express");
let fs = require("fs");
let path = require("path");
const compression = require("compression");
const app = express();

let usersFilePath = path.join(__dirname, "json/users.json");
let usersFile = fs.readFileSync(usersFilePath);
let users = JSON.parse(usersFile);

app.use(compression());
app.use(express.static("build"));

app.get("/ping", function (req, res) {
  console.log("pong");
  return res.send("pong");
});

app.get("/users", function (req, res) {
  console.log("get users");
  res.json(users);
});

app.listen(process.env.PORT || 8080, () =>
  console.log(`Listening on port ${process.env.PORT || 8080}!`)
);
